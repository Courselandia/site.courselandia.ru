import { storeToRefs } from 'pinia';

import { cacheDate } from '@/helpers/cache';
import direction from '@/stores/direction';

export default defineNuxtRouteMiddleware(async (to): Promise<void> => {
  try {
    const result = await $fetch('/api/direction/read', {
      params: {
        dateCache: cacheDate(),
      },
    });

    const { directions } = storeToRefs(direction());
    directions.value = result;
  } catch (error: any) {
    console.error(error.message);
  }
});
