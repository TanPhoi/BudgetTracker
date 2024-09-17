//Output: mon, tue, wed, thu, fri, sat, sun
export const getWeekRange = (): {startDate: Date; endDate: Date} => {
  const currentDate = new Date();

  const startOfWeek = new Date(currentDate);
  const dayOfWeek = startOfWeek.getDay();

  const startOfWeekDate =
    dayOfWeek === 0
      ? startOfWeek.getDate() - 6
      : startOfWeek.getDate() - (dayOfWeek - 1);
  startOfWeek.setDate(startOfWeekDate);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return {startDate: startOfWeek, endDate: endOfWeek};
};
