import { storeToRefs } from 'pinia';

import { apiLinkCollection } from '@/api/collection';
import collection from '@/stores/collection';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const {
    link,
  } = to.params;

  try {
    const result = await apiLinkCollection(false, link as string);
    const { itemLinkCollection } = storeToRefs(collection());

    itemLinkCollection.value = result;

    return !!result;
  } catch (error: any) {
    return false;
  }
});
