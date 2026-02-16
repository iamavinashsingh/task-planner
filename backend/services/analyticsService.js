const mongoose = require('mongoose');
const { Task, TASK_STATUS } = require('../models/Task');
const { getTimeframeBounds } = require('../utils/dateRange');

/**
 * Calculates efficiency metric using MongoDB aggregation.
 * Efficiency = (completed / total) * 100.
 *
 * @param {{userId: string, timeframe: 'daily'|'weekly'|'monthly'}} query
 * @returns {Promise<{timeframe: string, total: number, completed: number, efficiency: number}>}
 */
async function getEfficiency(query) {
  const { userId, timeframe } = query;
  const { startDate, endDate } = getTimeframeBounds(timeframe);

  const [result] = await Task.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        startDate: { $lte: endDate },
        endDate: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        completed: {
          $sum: {
            $cond: [{ $eq: ['$status', TASK_STATUS.COMPLETED] }, 1, 0]
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        total: 1,
        completed: 1,
        efficiency: {
          $cond: [
            { $eq: ['$total', 0] },
            0,
            {
              $round: [
                {
                  $multiply: [{ $divide: ['$completed', '$total'] }, 100]
                },
                2
              ]
            }
          ]
        }
      }
    }
  ]);

  if (!result) {
    return {
      timeframe,
      total: 0,
      completed: 0,
      efficiency: 0
    };
  }

  return {
    timeframe,
    total: result.total,
    completed: result.completed,
    efficiency: result.efficiency
  };
}

module.exports = {
  getEfficiency
};
