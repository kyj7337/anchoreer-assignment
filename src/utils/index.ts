import { DutyInfo } from '@/api/query/useGetDutyList';
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

export const findPrevNextProject = (totalProject: ProjectInfo[], currentProject?: ProjectInfo) => {
  let nextProject: ProjectInfo | null = null;
  let prevProject: ProjectInfo | null = null;
  for (let i = 0; i < totalProject.length; i++) {
    if (totalProject[i].id === currentProject?.id) {
      if (i !== 0) {
        prevProject = totalProject[i - 1];
      }
      if (i !== totalProject.length - 1) {
        nextProject = totalProject[i + 1];
      }
    }
  }

  return {
    nextProject,
    prevProject,
  };
};

export const getDutyNamesById = (ids: number[] | null, dutyList: DutyInfo[] | undefined) => {
  if (dutyList && ids) {
    const names = dutyList.reduce((result: string[], duty) => {
      for (const id of ids) {
        if (duty.id === id) {
          return result.concat(duty.name);
        }
      }
      return result;
    }, []);

    return names.join(', ');
  }
  return ``;
};

export const addIdList = (prevIdList: number[], selectId: number) => {
  const addedList = prevIdList.concat(selectId);
  const set = new Set();
  addedList.forEach((e) => set.add(e));
  return Array.from(set) as number[];
};
