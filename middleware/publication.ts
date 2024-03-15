import { storeToRefs } from 'pinia';

import publication from '@/stores/publication';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const {
    link,
  } = to.params;

  try {
    const result = await $fetch('/api/publication/link', {
      params: {
        link: link as string,
      },
    });

    const { itemLinkPublication } = storeToRefs(publication());

    itemLinkPublication.value = result;

    return !!result;
  } catch (error: any) {
    return false;
  }
});
