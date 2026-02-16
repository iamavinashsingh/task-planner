const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * Supported task cadence across planner views.
 * @readonly
 * @enum {string}
 */
const TASK_TYPES = Object.freeze({
  MONTHLY: 'MONTHLY',
  WEEKLY: 'WEEKLY',
  DAILY: 'DAILY'
});

/**
 * Supported task execution state.
 * @readonly
 * @enum {string}
 */
const TASK_STATUS = Object.freeze({
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  OVERDUE: 'OVERDUE'
});

/**
 * Task document schema for all planner entries. Monthly tasks are treated as
 * master tasks and are dynamically projected into weekly/daily views through
 * date-range queries instead of duplication.
 *
 * @typedef {Object} Task
 * @property {mongoose.Types.ObjectId} userId - Owner of the task.
 * @property {string} title - Human-readable task title.
 * @property {string} [description] - Extended context or instructions.
 * @property {'MONTHLY'|'WEEKLY'|'DAILY'} type - Task cadence classification.
 * @property {'PENDING'|'COMPLETED'|'OVERDUE'} status - Current status.
 * @property {Date} startDate - Range start date (inclusive).
 * @property {Date} endDate - Range end date (inclusive).
 * @property {string} [colorCategory] - Semantic category color identifier.
 * @property {mongoose.Types.ObjectId|null} [parentTaskId] - Parent monthly task.
 */
const taskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 140
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: ''
    },
    type: {
      type: String,
      enum: Object.values(TASK_TYPES),
      required: true,
      default: TASK_TYPES.DAILY
    },
    status: {
      type: String,
      enum: Object.values(TASK_STATUS),
      required: true,
      default: TASK_STATUS.PENDING
    },
    startDate: {
      type: Date,
      required: true,
      index: true
    },
    endDate: {
      type: Date,
      required: true,
      index: true
    },
    colorCategory: {
      type: String,
      trim: true,
      maxlength: 50,
      default: 'default'
    },
    parentTaskId: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

taskSchema.index({ userId: 1, startDate: 1, endDate: 1 });
taskSchema.index({ userId: 1, type: 1, status: 1 });
taskSchema.index({ parentTaskId: 1 });

taskSchema.pre('validate', function validateDateRange(next) {
  if (this.startDate && this.endDate && this.startDate > this.endDate) {
    return next(new Error('startDate must be earlier than or equal to endDate.'));
  }

  if (this.type === TASK_TYPES.MONTHLY && this.parentTaskId) {
    return next(new Error('Monthly task cannot reference a parentTaskId.'));
  }

  return next();
});

taskSchema.pre('save', function deriveOverdueStatus(next) {
  if (this.status !== TASK_STATUS.COMPLETED && this.endDate < new Date()) {
    this.status = TASK_STATUS.OVERDUE;
  }

  return next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = {
  Task,
  TASK_TYPES,
  TASK_STATUS
};
