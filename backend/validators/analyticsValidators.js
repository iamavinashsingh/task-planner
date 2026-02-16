const Joi = require('joi');
const { ANALYTICS_TIMEFRAMES } = require('../constants/taskConstants');

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const efficiencyQuerySchema = Joi.object({
  userId: Joi.string().pattern(objectIdPattern).required(),
  timeframe: Joi.string().valid(...Object.values(ANALYTICS_TIMEFRAMES)).required()
});

module.exports = {
  efficiencyQuerySchema
};
