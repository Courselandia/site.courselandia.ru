import { apiLinkCollection } from '@/api/collection';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const {
    link,
  } = to.params;

  try {
    const result = await apiLinkCollection(link as string);

    return !!result;
  } catch (error: any) {
    return false;
  }
});
