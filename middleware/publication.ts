import { storeToRefs } from 'pinia';

import { apiLinkPublication } from '@/api/publication';
import publication from '@/stores/publication';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const {
    link,
  } = to.params;

  try {
    const result = await apiLinkPublication(link as string);
    const { itemLinkPublication } = storeToRefs(publication());
    itemLinkPublication.value = result;

    return !!result;
  } catch (error: any) {
    return false;
  }
});
