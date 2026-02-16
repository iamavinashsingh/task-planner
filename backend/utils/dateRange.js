/**
 * Returns start and end bounds for planner view queries.
 *
 * @param {'DAILY'|'WEEKLY'|'MONTHLY'} view - Client view requesting tasks.
 * @param {Date} anchorDate - Date used to compute the range.
 * @returns {{rangeStart: Date, rangeEnd: Date}}
 */
function getViewRange(view, anchorDate) {
  const base = new Date(anchorDate);
  base.setHours(0, 0, 0, 0);

  if (view === 'DAILY') {
    const rangeStart = new Date(base);
    const rangeEnd = new Date(base);
    rangeEnd.setHours(23, 59, 59, 999);
    return { rangeStart, rangeEnd };
  }

  if (view === 'WEEKLY') {
    const day = base.getDay();
    const rangeStart = new Date(base);
    rangeStart.setDate(base.getDate() - day);

    const rangeEnd = new Date(rangeStart);
    rangeEnd.setDate(rangeStart.getDate() + 6);
    rangeEnd.setHours(23, 59, 59, 999);

    return { rangeStart, rangeEnd };
  }

  const rangeStart = new Date(base.getFullYear(), base.getMonth(), 1);
  const rangeEnd = new Date(base.getFullYear(), base.getMonth() + 1, 0, 23, 59, 59, 999);
  return { rangeStart, rangeEnd };
}

/**
 * Returns date bounds for analytics timeframe windows.
 *
 * @param {'daily'|'weekly'|'monthly'} timeframe - Analytics grouping window.
 * @param {Date} [referenceDate=new Date()] - Optional reference date.
 * @returns {{startDate: Date, endDate: Date}}
 */
function getTimeframeBounds(timeframe, referenceDate = new Date()) {
  const now = new Date(referenceDate);
  now.setHours(23, 59, 59, 999);

  if (timeframe === 'daily') {
    const startDate = new Date(now);
    startDate.setHours(0, 0, 0, 0);
    return { startDate, endDate: now };
  }

  if (timeframe === 'weekly') {
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    startDate.setHours(0, 0, 0, 0);
    return { startDate, endDate: now };
  }

  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  return { startDate, endDate: now };
}

module.exports = {
  getViewRange,
  getTimeframeBounds
};
