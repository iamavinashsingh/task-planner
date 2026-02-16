const express = require('express');
const { getEfficiencyHandler } = require('../../controllers/analyticsController');
const { validateRequest } = require('../../middlewares/validateRequest');
const { efficiencyQuerySchema } = require('../../validators/analyticsValidators');

const router = express.Router();

router.get('/efficiency', validateRequest({ query: efficiencyQuerySchema }), getEfficiencyHandler);

module.exports = router;
