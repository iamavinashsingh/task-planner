const Joi = require('joi');
const { TASK_TYPES, TASK_STATUS } = require('../models/Task');
const { PLANNER_VIEWS } = require('../constants/taskConstants');

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const createTaskSchema = Joi.object({
  userId: Joi.string().pattern(objectIdPattern).required(),
  title: Joi.string().trim().min(1).max(140).required(),
  description: Joi.string().trim().max(2000).allow('').default(''),
  type: Joi.string().valid(...Object.values(TASK_TYPES)).required(),
  status: Joi.string().valid(...Object.values(TASK_STATUS)).default(TASK_STATUS.PENDING),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  colorCategory: Joi.string().trim().max(50).default('default'),
  parentTaskId: Joi.string().pattern(objectIdPattern).allow(null)
});

const updateTaskSchema = Joi.object({
  userId: Joi.string().pattern(objectIdPattern).required(),
  sourceView: Joi.string().valid(...Object.values(PLANNER_VIEWS)).optional(),
  title: Joi.string().trim().min(1).max(140),
  description: Joi.string().trim().max(2000).allow(''),
  type: Joi.string().valid(...Object.values(TASK_TYPES)),
  status: Joi.string().valid(...Object.values(TASK_STATUS)),
  startDate: Joi.date(),
  endDate: Joi.date(),
  colorCategory: Joi.string().trim().max(50),
  parentTaskId: Joi.string().pattern(objectIdPattern).allow(null)
}).min(2);

const listTasksQuerySchema = Joi.object({
  userId: Joi.string().pattern(objectIdPattern).required(),
  view: Joi.string().valid(...Object.values(PLANNER_VIEWS)).required(),
  date: Joi.date().iso().required(),
  status: Joi.string().valid(...Object.values(TASK_STATUS)).optional()
});

const taskIdParamSchema = Joi.object({
  taskId: Joi.string().pattern(objectIdPattern).required()
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  listTasksQuerySchema,
  taskIdParamSchema
};
