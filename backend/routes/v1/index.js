const express = require('express');
const taskRoutes = require('./taskRoutes');
const analyticsRoutes = require('./analyticsRoutes');

const router = express.Router();

router.use('/tasks', taskRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;
