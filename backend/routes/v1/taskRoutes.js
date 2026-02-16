const express = require('express');
const { createTaskHandler, listTasksHandler, updateTaskHandler } = require('../../controllers/taskController');
const { validateRequest } = require('../../middlewares/validateRequest');
const {
  createTaskSchema,
  updateTaskSchema,
  listTasksQuerySchema,
  taskIdParamSchema
} = require('../../validators/taskValidators');

const router = express.Router();

router.post('/', validateRequest({ body: createTaskSchema }), createTaskHandler);
router.get('/', validateRequest({ query: listTasksQuerySchema }), listTasksHandler);
router.patch('/:taskId', validateRequest({ params: taskIdParamSchema, body: updateTaskSchema }), updateTaskHandler);
router.put('/:taskId', validateRequest({ params: taskIdParamSchema, body: updateTaskSchema }), updateTaskHandler);

module.exports = router;
