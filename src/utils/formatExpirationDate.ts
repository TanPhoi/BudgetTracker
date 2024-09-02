export const formatExpirationDate = (date: string): string => {
  const cleanDate = date.replace(/\D/g, '');
  const month = cleanDate.substring(0, 2);
  const year = cleanDate.substring(2, 4);
  return `${month}${month && year ? '/' : ''}${year}`;
};
