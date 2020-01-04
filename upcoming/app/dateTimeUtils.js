/**
 * Get a short month string for an index.
 *
 * @param {number} value - index to search with.
 * @returns {string} Short month.
 */
const getMonthStr = (value) => {
  const values = {
    1: 'Jan', 2: 'Feb', 3: 'Mar',
    4: 'Apr', 5: 'May',  6: 'Jun',
    7: 'Jul', 8: 'Aug', 9: 'Sep',
    10: 'Oct', 11: 'Nov', 12: 'Dec'
  };
  return values[parseInt(value, 10)];
};

/**
 * Get a short day of the week string for an index.
 *
 * @param {number} value - index to search with.
 * @returns {string} Short day of the week.
 */
const getDayStr = (value) => {
  const values = {
    0: 'Mon', 1: 'Tue', 2: 'Wed', 3: 'Thu',
    4: 'Fri', 5: 'Sat',  6: 'Sun'
  };
  return values[parseInt(value, 10)];
};

/**
 * Determine if a date is today. Can be adjusted to find if another day.
 *
 * @param {string} date - Date string.
 * @param {number} [shiftBack] Optionally go back a number of days.
 * @returns {boolean} true if the date passed in is today or the adjusted day.
 */
const isToday = (date, shiftBack = 0) => {
  const now = new Date();
  const [year, month, day] = date.split('/');
  return (parseInt(year) === now.getFullYear() &&
    (parseInt(month) - 1) === now.getMonth() &&
    (parseInt(day) - shiftBack) === now.getDate());
};

/**
 * Determine if a date string is tomorrow.
 *
 * @param {string} date - Date string to test.
 * @returns {boolean} true if the date is tomorrow.
 */
const isTomorrow = date => isToday(date, 1);

/**
 * Decode a pair of dates into a more friendly date range string.
 *
 * @param {string} startDate - Start date string.
 * @param {string} endDate - End date string.
 * @returns {string} Friendly date rante string.
 */
export const decodeDate = (startDate, endDate) => {
  const [startYear, startMonth, startDay] = startDate.split('/');
  const [finishYear, finishMonth, finishDay] = endDate.split('/');

  // Single day
  if (startDate === endDate) {
    return isToday(startDate)
      ? 'Today'
      : isTomorrow(startDate)
        ? 'Tomorrow'
        : `${startDay} ${getMonthStr(startMonth)}`;
  }

  // Multi-day
  return `${startDay} ${getMonthStr(startMonth)} - ${finishDay} ${getMonthStr(finishMonth)}`;
};
