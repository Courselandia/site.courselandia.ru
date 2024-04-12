import { storeToRefs } from 'pinia';

import { cacheDate } from '@/helpers/cache';
import school from '@/stores/school';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const {
    link,
  } = to.params;

  try {
    const result = await $fetch('/api/school/link', {
      params: {
        link: link as string,
        cacheDate: cacheDate(),
      },
    });

    const { itemLinkSchool } = storeToRefs(school());

    itemLinkSchool.value = result;

    return !!result;
  } catch (error: any) {
    return false;
  }
});
