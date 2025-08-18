export const getOrdinalSuffix = (numStr: string | number) => {
  const num = typeof numStr === 'string' ? parseInt(numStr, 10) : numStr;
  if (isNaN(num)) return '';
  const tens = num % 100;
  if (tens >= 11 && tens <= 13) return 'th';
  switch (num % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};
