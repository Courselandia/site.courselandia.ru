import ECurrency from '@/enums/components/modules/catalog/currency';

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
