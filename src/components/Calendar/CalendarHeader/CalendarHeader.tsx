import { getYearAndMonthFromDate } from '@/utils';
import { Dispatch, SetStateAction } from 'react';
import styles from './CalendarHeader.module.scss';

interface CalendarHeaderProps {
  /** 현재 날짜 */
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
}

export default function CalendarHeader(props: CalendarHeaderProps) {
  const { currentDate, setCurrentDate } = props;
  const yearAndMonth = getYearAndMonthFromDate(currentDate);
  return (
    <header className={styles.headerContainer}>
      <div></div>
      <div>{yearAndMonth}</div>
      <div></div>
    </header>
  );
}
