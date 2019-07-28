const getMonthStr = (value) => {
  const values = {
    1: 'Jan', 2: 'Feb', 3: 'Mar',
    4: 'Apr', 5: 'May',  6: 'Jun',
    7: 'Jul', 8: 'Aug', 9: 'Sep',
    10: 'Oct', 11: 'Nov', 12: 'Dec'
  };
  return values[parseInt(value, 10)];
};

const getDayStr = (value) => {
  const values = {
    0: 'Mon', 1: 'Tue', 2: 'Wed', 3: 'Thu',
    4: 'Fri', 5: 'Sat',  6: 'Sun'
  };
  return values[parseInt(value, 10)];
};

const isToday = (date, deltaDays = 0) => {
  const now = new Date();
  const [year, month, day] = date.split('/');
  return (parseInt(year) === now.getFullYear() &&
    (parseInt(month) - 1) === now.getMonth() &&
    (parseInt(day) - deltaDays) === now.getDate());
};

const isTomorrow = date => isToday(date, 1);

export const decodeDate = (startDate, endDate) => {
  const [startYear, startMonth, startDay] = startDate.split('/');
  const [finishYear, finishMonth, finishDay] = endDate.split('/');

  // Single day
  if (startDate === endDate) {
    // Today?
    if (isToday(startDate)) {
      return 'Today';
    }
    if (isTomorrow(startDate)) {
      return 'Tomorrow';
    }

    return `${startDay} ${getMonthStr(startMonth)}`;
  }

  // Multi-day
  return `${startDay} ${getMonthStr(startMonth)} - ${finishDay} ${getMonthStr(finishMonth)}`;
};
