import { storeToRefs } from 'pinia';

import direction from '@/stores/direction';

export default defineNuxtRouteMiddleware(async (to): Promise<void> => {
  const config = useRuntimeConfig();

  try {
    const result = await $fetch('/api/direction/read');

    const { directions } = storeToRefs(direction());
    directions.value = result;
  } catch (error: any) {
    console.error(error.message);
  }
});
