const getMonthStr = (month) => {
  const values = {
    1: 'Jan', 2: 'Feb', 3: 'Mar',
    4: 'Apr', 5: 'May',  6: 'Jun',
    7: 'Jul', 8: 'Aug', 9: 'Sep',
    10: 'Oct', 11: 'Nov', 12: 'Dec'
  };
  return values[parseInt(month)];
};

const isToday = (date, delta = 0) => {
  const now = new Date();
  const [year, month, day] = date.split('/');
  return (parseInt(year) === now.getFullYear() &&
    (parseInt(month) - 1) === now.getMonth() &&
    (parseInt(day) - delta) === now.getDate());
};

const isTomorrow = date => isToday(date, 1);

// 2018/04/19|2018/04/21 > 14 Mar - 15 Mar
export const decodeDate = (startDate, endDate) => {
  const [startYear, startMonth, startDay] = startDate.split('/');
  const [finishYear, finishMonth, finishDay] = endDate.split('/');
  
  // Single day
  if(startDate === endDate) {
    // Today?
    if(isToday(startDate)) return 'Today';
    if(isTomorrow(startDate)) return 'Tomorrow';
    
    return `${startDay} ${getMonthStr(startMonth)}`;
  }
  
  // Multi-day
  return `${startDay} ${getMonthStr(startMonth)} - ${finishDay} ${getMonthStr(finishMonth)}`;
};
