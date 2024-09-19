import {formatMonthAndDay} from './formatMonthAndDay';

//input: startDate: 2024-09-18T00:00:00.000Z, endDate: 2024-09-29T17:00:00.000Z
//output: Sep 18 - Sep 30, 2024
export const formatDateRange = (startDate: Date, endDate: Date): string => {
  const startDateStr = formatMonthAndDay(startDate);
  const endDateStr = formatMonthAndDay(endDate);

  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  return startYear === endYear
    ? `${startDateStr} - ${endDateStr}, ${startYear}`
    : `${startDateStr}, ${startYear} - ${endDateStr}, ${endYear}`;
};
