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

  // Tạo đối tượng Date ở múi giờ địa phương
  const localDate = new Date();
  localDate.setFullYear(parseInt(year, 10));
  localDate.setMonth(monthIndex);
  localDate.setDate(parseInt(day, 10));
  localDate.setHours(hour24, parseInt(minute, 10), 0, 0);

  // Chuyển đổi thời gian sang UTC
  const utcDate = new Date(
    Date.UTC(
      localDate.getFullYear(),
      localDate.getMonth(),
      localDate.getDate(),
      localDate.getHours(),
      localDate.getMinutes(),
      localDate.getSeconds(),
      localDate.getMilliseconds(),
    ),
  );
  return utcDate;
};
