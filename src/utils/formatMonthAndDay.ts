//input: 2024-09-18T00:00:00.000Z
//output: Sep 18
export const formatMonthAndDay = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};
