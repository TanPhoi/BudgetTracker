import {NON_DIGIT_REGEX} from '@/constants/regexs.constant';

export const formatExpirationDate = (date: string): string => {
  const cleanDate = date.replace(NON_DIGIT_REGEX, '');
  const month = cleanDate.substring(0, 2);
  const year = cleanDate.substring(2, 4);
  return `${month}${month && year ? '/' : ''}${year}`;
};
