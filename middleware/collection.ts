import { storeToRefs } from 'pinia';

import collection from '@/stores/collection';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const {
    link,
  } = to.params;

  try {
    const result = await $fetch('/api/collection/link', {
      params: {
        link: link as string,
      },
    });

    const { itemLinkCollection } = storeToRefs(collection());

    itemLinkCollection.value = result;

    return !!result;
  } catch (error: any) {
    return false;
  }
});
