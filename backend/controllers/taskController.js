const { sendSuccess } = require('../utils/apiResponse');
const { createTask, getTasksForView, updateTask } = require('../services/taskService');

/**
 * POST /api/v1/tasks
 */
async function createTaskHandler(req, res, next) {
  try {
    const task = await createTask(req.body);
    return sendSuccess(res, task, 201);
  } catch (error) {
    return next(error);
  }
}

/**
 * GET /api/v1/tasks
 */
async function listTasksHandler(req, res, next) {
  try {
    const tasks = await getTasksForView(req.query);
    return sendSuccess(res, {
      total: tasks.length,
      tasks
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * PATCH /api/v1/tasks/:taskId
 */
async function updateTaskHandler(req, res, next) {
  try {
    const updatedTask = await updateTask(req.params.taskId, req.body);
    return sendSuccess(res, updatedTask);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createTaskHandler,
  listTasksHandler,
  updateTaskHandler
};
