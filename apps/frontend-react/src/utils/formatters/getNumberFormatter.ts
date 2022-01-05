export const getNumberFormatter = (decimalPlaces = 3) =>
  new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: decimalPlaces,
  });
