//input: 1234567898765432
//output: 1234 5678 9876 5432
export const formatCardNumber = (number: string): string => {
  const cleanNumber = number.replace(/\D/g, '');
  const formattedNumber = cleanNumber.match(/.{1,4}/g)?.join(' ') || '';
  return formattedNumber;
};
