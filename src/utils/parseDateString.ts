//input: 2:16 PM | Sep 16, 2024
//output: 2024-09-15T19:16:00.000Z

export const parseDateString = (dateString: string): Date => {
  const [timePart, datePart] = dateString.split(' | ');
  const [month, day, year] = datePart.split(' ');
  const [hour, minutePart] = timePart.split(':');
  const [minute, period] = minutePart.split(' ');
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthIndex = monthNames.indexOf(month);
  let hour24 = parseInt(hour, 10);
  if (period === 'PM' && hour24 < 12) hour24 += 12;
  if (period === 'AM' && hour24 === 12) hour24 = 0;

  const date = new Date();
  date.setFullYear(parseInt(year, 10));
  date.setMonth(monthIndex);
  date.setDate(parseInt(day, 10));
  date.setHours(hour24);
  date.setMinutes(parseInt(minute, 10));
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
};
