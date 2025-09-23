export const checkYearValidation = (data: number): boolean => {
  const currentYear = new Date().getFullYear();
  const year = data.toString();
  return year.length === 4 && data <= currentYear;
};