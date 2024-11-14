import { makeCalendarDateList, sliceByCount } from '@/utils';
import { useMemo } from 'react';

interface CalenderBodyProps {
  currentDate: Date;
}

export default function CalendarBody(props: CalenderBodyProps) {
  const { currentDate } = props;
  const calendarDateList = useMemo(
    () => sliceByCount(makeCalendarDateList(currentDate), 7),
    [currentDate]
  );
  console.log(calendarDateList);

  return (
    <div>
      {calendarDateList.map((week, weekIdx) => {
        return (
          <div key={weekIdx}>
            {week.map((day, dayIdx) => {
              return <div key={dayIdx}>{day.day}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
}
