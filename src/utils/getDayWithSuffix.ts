//input: 1
//output: st

//input: 2
//output: nd

//input: 3
//output: rd

//input: 4 -> 31
//output: th
export const getDayWithSuffix = (day: number) => {
  if (day > 3 && day < 21) return day + 'th';
  switch (day % 10) {
    case 1:
      return day + 'st';
    case 2:
      return day + 'nd';
    case 3:
      return day + 'rd';
    default:
      return day + 'th';
  }
};
