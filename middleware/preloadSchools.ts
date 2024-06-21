import { storeToRefs } from 'pinia';

import { apiReadSchools } from '@/api/school';
import school from '@/stores/school';

export default defineNuxtRouteMiddleware(async (to): Promise<void> => {
  try {
    const result = await apiReadSchools();

    const { schools } = storeToRefs(school());
    schools.value = result;
  } catch (error: any) {
    console.error(error.message);
  }
});
