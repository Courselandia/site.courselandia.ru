import { storeToRefs } from 'pinia';

import school from '@/stores/school';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const {
    link,
  } = to.params;

  const config = useRuntimeConfig();

  try {
    const result = await $fetch('/api/school/link', {
      params: {
        link: link as string,
      },
    });

    const { itemLinkSchool } = storeToRefs(school());

    itemLinkSchool.value = result;

    return !!result;
  } catch (error: any) {
    return false;
  }
});
