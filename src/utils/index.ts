import { format } from 'date-fns';

export const getYearAndMonthFromDate = (date: Date) => {
  return format(date, 'yyyy.MM');
};
