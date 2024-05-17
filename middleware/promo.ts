import { storeToRefs } from 'pinia';

import { cacheDate } from '@/helpers/cache';
import promo from '@/stores/promo';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const {
    link,
  } = to.params;

  try {
    const result = await $fetch('/api/promo/link', {
      params: {
        link: link as string,
        cacheDate: cacheDate(),
      },
    });

    const { itemLinkPromo } = storeToRefs(promo());

    itemLinkPromo.value = result;

    return !!result;
  } catch (error: any) {
    return false;
  }
});
