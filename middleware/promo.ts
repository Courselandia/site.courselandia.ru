import { storeToRefs } from 'pinia';

import { apiLinkPromo } from '@/api/promo';
import promo from '@/stores/promo';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const {
    link,
  } = to.params;

  try {
    const result = await apiLinkPromo(link as string);

    const { itemLinkPromo } = storeToRefs(promo());

    itemLinkPromo.value = result;

    return !!result;
  } catch (error: any) {
    return false;
  }
});
