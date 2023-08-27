import { storeToRefs } from 'pinia';

import school from '@/stores/school';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const {
    link,
  } = to.params;

  try {
    const result = await $fetch('/api/school/link', {
      params: {
        link: link as string,
      },
    });

    if (!result?.reviews_count) {
      return false;
    }

    const { itemLinkSchool } = storeToRefs(school());

    itemLinkSchool.value = result;

    return !!result;
  } catch (error: any) {
    return false;
  }
});
