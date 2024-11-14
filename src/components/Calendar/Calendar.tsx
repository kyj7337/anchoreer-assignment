import { useState } from 'react';
import CalendarHeader from './CalendarHeader/CalendarHeader';
import styles from './Calendar.module.scss';
import CalendarBody from './CalendarBody/CalendarBody';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  console.log(currentDate);
  return (
    <div className={styles.calendarContainer}>
      <CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <CalendarBody currentDate={currentDate} />
    </div>
  );
}
