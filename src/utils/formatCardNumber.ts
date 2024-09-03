//input: 1234567898765432
//output: 1234 5678 9876 5432
export const formatCardNumber = (number: string) => {
  // Loại bỏ tất cả các ký tự không phải số
  let cleaned = number.replace(/\D+/g, '');

  // Giới hạn chiều dài dữ liệu nhập vào 16 ký tự
  cleaned = cleaned.substring(0, 16);

  // Chia thành các nhóm 4 số
  let formatted = '';
  for (let i = 0; i < cleaned.length; i += 4) {
    if (i > 0) {
      formatted += ' ';
    }
    formatted += cleaned.substring(i, i + 4);
  }

  return formatted;
};
