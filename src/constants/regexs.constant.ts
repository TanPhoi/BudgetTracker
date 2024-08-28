export const formatCardNumber = (number: string): string => {
  const cleanNumber = number.replace(/\D/g, '');
  const formattedNumber = cleanNumber.match(/.{1,4}/g)?.join(' ') || '';
  return formattedNumber;
};

export const formatExpirationDate = (date: string): string => {
  const cleanDate = date.replace(/\D/g, '');
  const month = cleanDate.substring(0, 2);
  const year = cleanDate.substring(2, 4);
  return `${month}${month && year ? '/' : ''}${year}`;
};

export const REGEX = {
  ONLY_NUMBERS_AND_DOTS: /[^0-9.]/g,
};
