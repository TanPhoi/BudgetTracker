//output: 2024-09-18
export const getCurrentDate = (): string => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};
