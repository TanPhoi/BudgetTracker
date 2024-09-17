export const getDateRange = (
  timeFrame: string,
): {startDate: Date; endDate: Date} => {
  const now = new Date();
  let startDate: Date, endDate: Date;

  switch (timeFrame) {
    case 'daily':
      const dailyStart = new Date(now);
      startDate = new Date(dailyStart.setHours(0, 0, 0, 0));

      endDate = new Date(dailyStart.setHours(23, 59, 59, 999));
      break;
    case 'monthly':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999,
      );
      break;
    case 'yearly':
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
      break;
    default:
      startDate = new Date(0);
      endDate = new Date();
  }

  return {startDate, endDate};
};
