import { apiLinkPromo } from '@/api/promo';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const {
    link,
  } = to.params;

  try {
    const result = await apiLinkPromo(link as string);

    return !!result;
  } catch (error: any) {
    return false;
  }
});
