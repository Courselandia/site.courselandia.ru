import { storeToRefs } from 'pinia';

import { apiLinkSchool } from '@/api/school';
import school from '@/stores/school';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const {
    link,
  } = to.params;

  try {
    const result = await apiLinkSchool(link as string);

    const { itemLinkSchool } = storeToRefs(school());

    itemLinkSchool.value = result;

    return !!result;
  } catch (error: any) {
    return false;
  }
});
