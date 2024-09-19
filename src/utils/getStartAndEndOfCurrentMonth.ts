export const getStartAndEndOfCurrentMonth = (): {start: Date; end: Date} => {
  const currentDate = new Date();

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );

  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );

  startOfMonth.setUTCHours(0, 0, 0, 0);
  endOfMonth.setUTCHours(23, 59, 59, 999);

  return {start: startOfMonth, end: endOfMonth};
};
