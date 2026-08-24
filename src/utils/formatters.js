export const formatPrice = (price) => {
  if (price === undefined || price === null) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);
};

export const formatNumber = (num) => {
  if (num === undefined || num === null) return '0';
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatMileage = (mileage) => {
  if (mileage === undefined || mileage === null) return '0 km';
  return `${formatNumber(mileage)} km`;
};
