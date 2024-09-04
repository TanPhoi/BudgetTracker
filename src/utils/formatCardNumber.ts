import {NON_DIGIT_REGEX} from '@/constants/regexs.constant';

//input: 1234567898765432
//output: 1234 5678 9876 5432
export const formatCardNumber = (number: string) => {
  let cleaned = number.replace(NON_DIGIT_REGEX, '');

  cleaned = cleaned.substring(0, 16);

  let formatted = '';
  for (let i = 0; i < cleaned.length; i += 4) {
    if (i > 0) {
      formatted += ' ';
    }
    formatted += cleaned.substring(i, i + 4);
  }

  return formatted;
};
