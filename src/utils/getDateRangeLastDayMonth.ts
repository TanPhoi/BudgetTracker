import {formatDateRange} from './formatDateRange';

export const getDateRangeLastDayMonth = (
  time: string,
): {start: Date; end: Date} => {
  const currentDate = new Date(time);
  const start = new Date(currentDate);
  const end = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );
  return {start, end};
};
