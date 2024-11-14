import { useState } from 'react';
import CalendarHeader from './CalendarHeader/CalendarHeader';
import styles from './Calendar.module.scss';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  console.log(currentDate);
  return (
    <div>
      <CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate} />
    </div>
  );
}
