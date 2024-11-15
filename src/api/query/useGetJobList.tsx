import { useQuery } from '@tanstack/react-query';
import defaultAxios from '../config';
import { isSameDay } from 'date-fns';
import { CalendarDateList, sortByStartTime } from '@/utils';

const uri = '/api/v1/recruits.json';

export interface ProjectInfo {
  id: number;
  company_name: string;
  title: string;
  start_time: string;
  end_time: string;
  image_url: string;
  duty_ids: number[] | null;
}
interface ProjectInfoDtos extends CalendarDateList {
  projects: ProjectInfo[];
}

const fetcher = (calendars: CalendarDateList[][]) => {
  return defaultAxios.get<ProjectInfo[]>(uri).then(({ data }) => {
    const result: ProjectInfoDtos[][] = calendars.map((week) => {
      return week.map((day) => {
        const itemInfo: ProjectInfoDtos = { ...day, projects: [] };
        data.forEach((project) => {
          const isCurrentDayEvent =
            isSameDay(day.date, project.start_time) || isSameDay(day.date, project.end_time);
          if (isCurrentDayEvent) itemInfo.projects.push(project);
        });
        itemInfo.projects = sortByStartTime(itemInfo.projects, itemInfo.date);
        return itemInfo;
      });
    });
    return result;
  });
};

export default function useGetJobList(calendars: CalendarDateList[][]) {
  return useQuery({
    queryKey: ['get-job-list', calendars],
    queryFn: () => fetcher(calendars),
  });
}
