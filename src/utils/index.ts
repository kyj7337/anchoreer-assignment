import { ProjectInfo } from '@/api/query/useGetJobList';
import { format, startOfMonth, startOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';

export const getYearAndMonthFromDate = (date: Date) => {
  return format(date, 'yyyy.MM');
};

export interface CalendarDateList {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
}

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
  const result: CalendarDateList[] = dates.map((date) => ({
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

export const sortByStartTime = (projects: ProjectInfo[], currentDate: Date): ProjectInfo[] => {
  const startProjects: ProjectInfo[] = [];
  const endProjects: ProjectInfo[] = [];
  projects.forEach((elem) => {
    if (isSameDay(elem.start_time, currentDate)) startProjects.push(elem);
    else endProjects.push(elem);
  });
  return [...startProjects, ...endProjects];
};
