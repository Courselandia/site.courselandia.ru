import dayjs from 'dayjs';

import ECacheDate from '@/enums/cache';

export const cacheDate = (date?: ECacheDate): string => {
  if (date === ECacheDate.MONTH) {
    return dayjs().format('01-MM-YYYY');
  }

  if (date === ECacheDate.YEAR) {
    return dayjs().format('01-01-YYYY');
  }

  return dayjs().format('DD-MM-YYYY');
};
