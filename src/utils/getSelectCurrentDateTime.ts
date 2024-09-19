//input: day
//output: 18
export const getSelectCurrentDateTime = (
  type: 'day' | 'month' | 'year' | 'hours' | 'minutes' | 'seconds',
): number => {
  const now = new Date();

  switch (type) {
    case 'day':
      return now.getDate();
    case 'month':
      return now.getMonth() + 1;
    case 'year':
      return now.getFullYear();
    case 'hours':
      return now.getHours();
    case 'minutes':
      return now.getMinutes();
    case 'seconds':
      return now.getSeconds();
    default:
      throw new Error(
        'Invalid type. Please use: day, month, year, hours, minutes, seconds.',
      );
  }
};
