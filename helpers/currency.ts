import ECurrency from '@/enums/components/molecules/currency';

const currency = (value: ECurrency): string => {
  if (value === ECurrency.RUB) {
    return '₽';
  }

  if (value === ECurrency.USD) {
    return '$';
  }

  if (value === ECurrency.EUR) {
    return '€';
  }

  return '';
};

export default currency;
