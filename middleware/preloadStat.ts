import { storeToRefs } from 'pinia';

import { cacheDate } from '@/helpers/cache';
import course from '@/stores/course';

export default defineNuxtRouteMiddleware(async (): Promise<void> => {
  try {
    const result = await $fetch('/api/course/stat', {
      params: {
        cacheDate: cacheDate(),
      },
    });

    const { stat } = storeToRefs(course());
    stat.value = result;
  } catch (error: any) {
    console.error(error.message);
  }
});
