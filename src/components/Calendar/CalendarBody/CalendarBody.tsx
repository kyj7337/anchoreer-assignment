import { makeCalendarDateList, sliceByCount } from '@/utils';
import { useMemo } from 'react';
import styles from './CalendarBody.module.scss';
import useGetJobList from '@/api/query/useGetJobList';
import classNames from 'classnames';
import { isSameDay } from 'date-fns';

interface CalenderBodyProps {
  currentDate: Date;
}

function CompanyNamePrefix({ text }: { text: '시' | '끝' }) {
  return (
    <div
      className={classNames(styles.companyPrefix, {
        [styles.start]: text === '시',
        [styles.end]: text === '끝',
      })}
    >
      {text}
    </div>
  );
}

export default function CalendarBody(props: CalenderBodyProps) {
  const { currentDate } = props;
  const calendarDateList = useMemo(
    () => sliceByCount(makeCalendarDateList(currentDate), 7),
    [currentDate]
  );
  const { data, isLoading } = useGetJobList(calendarDateList);

  if (isLoading) {
    return <div>로딩중 입니다...</div>;
  }

  return (
    <div className={styles.calendarBody}>
      {data?.map((week, weekIdx) => {
        return (
          <div className={styles.tableRow} key={weekIdx}>
            {week.map((day, dayIdx) => {
              return (
                <div className={styles.tableColumn} key={dayIdx}>
                  <div className={styles.tableColumnDay}>{day.day}</div>
                  <div className={styles.tableColumnProject}>
                    {day.projects.map((project) => {
                      const isStartEvent = isSameDay(project.start_time, day.date);
                      return (
                        <div className={styles.tableCompanyRow} key={project.id}>
                          <CompanyNamePrefix text={isStartEvent ? '시' : '끝'} />
                          <span className={styles.tableColumnCompanyName}>
                            {project.company_name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
