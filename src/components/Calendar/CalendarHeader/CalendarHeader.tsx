import { getYearAndMonthFromDate } from '@/utils';
import { Dispatch, SetStateAction } from 'react';
import styles from './CalendarHeader.module.scss';
import leftIcon from '@/assets/ic_arrow_left_linear.svg';
import rightIcon from '@/assets/ic_arrow_right_linear.svg';
import { sub, add } from 'date-fns';

interface CalendarHeaderProps {
  /** 현재 날짜 */
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
}

type Direction = 'prev' | 'next';

export default function CalendarHeader(props: CalendarHeaderProps) {
  const { currentDate, setCurrentDate } = props;
  const yearAndMonth = getYearAndMonthFromDate(currentDate);
  const onClickIcon = (direction: Direction) => {
    const dateCalculationfunc = direction === 'prev' ? sub : add;
    const newValue = dateCalculationfunc(currentDate, {
      months: 1,
    });

    setCurrentDate(newValue);
  };
  return (
    <header className={styles.headerContainer}>
      <img src={leftIcon} className={styles.icon} onClick={() => onClickIcon('prev')} />

      <div className={styles.currentDate}>{yearAndMonth}</div>

      <img src={rightIcon} className={styles.icon} onClick={() => onClickIcon('next')} />
    </header>
  );
}
