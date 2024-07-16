import { apiLinkSchool } from '@/api/school';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const {
    link,
  } = to.params;

  try {
    const result = await apiLinkSchool(link as string);

    if (!result?.amount_reviews) {
      return false;
    }

    return !!result;
  } catch (error: any) {
    return false;
  }
});
