import EDuration from '@/enums/components/modules/catalog/duration';

const duration = (value: number, unit: EDuration): string => {
  if (unit === EDuration.DAY) {
    if (value === 1) {
      return `${value} день`;
    }

    if (value >= 2 && value <= 4) {
      return `${value} дня`;
    }

    if (value >= 5) {
      return `${value} дней`;
    }
  }

  if (unit === EDuration.WEEK) {
    if (value === 1) {
      return `${value} неделя`;
    }

    if (value >= 2 && value <= 4) {
      return `${value} недели`;
    }

    if (value >= 5) {
      return `${value} недель`;
    }
  }

  if (unit === EDuration.MONTH) {
    if (value === 1) {
      return `${value} месяц`;
    }

    if (value >= 2 && value <= 4) {
      return `${value} месяца`;
    }

    if (value >= 5) {
      return `${value} месяцев`;
    }
  }

  if (unit === EDuration.YEAR) {
    if (value === 1) {
      return `${value} год`;
    }

    if (value >= 2 && value <= 4) {
      return `${value} года`;
    }

    if (value >= 5) {
      return `${value} лет`;
    }
  }

  return '';
};

export default duration;
