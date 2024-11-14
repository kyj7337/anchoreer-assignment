import { format, startOfMonth, startOfWeek, addDays, isSameMonth } from 'date-fns';

export const getYearAndMonthFromDate = (date: Date) => {
  return format(date, 'yyyy.MM');
};

export const makeCalendarDateList = (currentDate: Date) => {
  const CALENDAR_TOTAL_DAY = 35;
  const firstDayOfMonth = startOfMonth(currentDate);

  const calendarStart = startOfWeek(firstDayOfMonth);
  const dates = [];
  let tempCurrent = calendarStart;

  while (dates.length < CALENDAR_TOTAL_DAY) {
    dates.push(tempCurrent);
    tempCurrent = addDays(tempCurrent, 1);
  }
  const result = dates.map((date) => ({
    date,
    day: date.getDate(),
    isCurrentMonth: isSameMonth(currentDate, date),
  }));
  return result;
};

export const sliceByCount = <T>(arr: T[], size: number): T[][] => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};
