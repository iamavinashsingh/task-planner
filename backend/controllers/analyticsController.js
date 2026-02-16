const { sendSuccess } = require('../utils/apiResponse');
const { getEfficiency } = require('../services/analyticsService');

/**
 * GET /api/v1/analytics/efficiency
 */
async function getEfficiencyHandler(req, res, next) {
  try {
    const efficiency = await getEfficiency(req.query);
    return sendSuccess(res, efficiency);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getEfficiencyHandler
};
