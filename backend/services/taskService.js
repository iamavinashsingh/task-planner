const { Task, TASK_TYPES } = require('../models/Task');
const { AppError } = require('../middlewares/errorHandler');
const { getViewRange } = require('../utils/dateRange');

const MONTHLY_CORE_FIELDS = ['title', 'description', 'startDate', 'endDate', 'colorCategory', 'type'];

/**
 * Creates a task while enforcing parent linkage semantics.
 *
 * @param {object} payload - Validated task payload.
 * @returns {Promise<import('mongoose').Document>}
 */
async function createTask(payload) {
  if (payload.type === TASK_TYPES.MONTHLY) {
    payload.parentTaskId = null;
  }

  if (payload.type !== TASK_TYPES.DAILY && payload.parentTaskId) {
    throw new AppError('Only daily tasks can reference a parent task.', 400, true);
  }

  const task = await Task.create(payload);
  return task;
}

/**
 * Returns tasks for a requested view date, including dynamic projection of
 * monthly tasks if they overlap the requested range.
 *
 * @param {{userId: string, view: 'DAILY'|'WEEKLY'|'MONTHLY', date: string|Date, status?: string}} query
 * @returns {Promise<Array<import('mongoose').Document>>}
 */
async function getTasksForView(query) {
  const { userId, view, date, status } = query;
  const { rangeStart, rangeEnd } = getViewRange(view, new Date(date));

  const overlapFilter = {
    userId,
    startDate: { $lte: rangeEnd },
    endDate: { $gte: rangeStart }
  };

  if (status) {
    overlapFilter.status = status;
  }

  const tasks = await Task.find(overlapFilter).sort({ startDate: 1, endDate: 1, createdAt: 1 }).lean();

  return tasks.map((task) => ({
    ...task,
    isProjectedFromMonthly: task.type === TASK_TYPES.MONTHLY && view !== 'MONTHLY',
    requestedView: view
  }));
}

/**
 * Updates a task with immutability guard for monthly tasks when update source
 * is daily/weekly context.
 *
 * @param {string} taskId - Target task id.
 * @param {object} payload - Validated update payload.
 * @returns {Promise<import('mongoose').Document>}
 */
async function updateTask(taskId, payload) {
  const existingTask = await Task.findById(taskId);

  if (!existingTask) {
    throw new AppError('Task not found.', 404, true);
  }

  if (String(existingTask.userId) !== payload.userId) {
    throw new AppError('You are not allowed to modify this task.', 403, true);
  }

  const sourceView = payload.sourceView;
  const blockedView = sourceView === 'DAILY' || sourceView === 'WEEKLY';
  const modifiesCoreDetails = MONTHLY_CORE_FIELDS.some((field) => Object.prototype.hasOwnProperty.call(payload, field));

  if (existingTask.type === TASK_TYPES.MONTHLY && blockedView && modifiesCoreDetails) {
    throw new AppError(
      'Monthly multi-day task core details cannot be edited from daily/weekly payloads.',
      409,
      true
    );
  }

  const mutablePayload = { ...payload };
  delete mutablePayload.userId;
  delete mutablePayload.sourceView;

  Object.assign(existingTask, mutablePayload);
  await existingTask.save();
  return existingTask;
}

module.exports = {
  createTask,
  getTasksForView,
  updateTask
};
