import { storeToRefs } from 'pinia';

import school from '@/stores/school';

export default defineNuxtRouteMiddleware(async (to): Promise<void> => {
  try {
    const result = await $fetch('/api/school/read');

    const { schools } = storeToRefs(school());
    schools.value = result;
  } catch (error: any) {
    console.error(error.message);
  }
});
