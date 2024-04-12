import ECacheDate from '@/enums/cache';

export const cacheDate = (date?: ECacheDate): string => {
  if (date === ECacheDate.MONTH) {
    return `01-${new Date().getMonth()}-${new Date().getFullYear()}`;
  }

  if (date === ECacheDate.YEAR) {
    return `01-01-${new Date().getFullYear()}`;
  }

  return `${new Date().getDay()}-${new Date().getMonth()}-${new Date().getFullYear()}`;
};
