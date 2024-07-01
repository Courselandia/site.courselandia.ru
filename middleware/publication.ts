import { apiLinkPublication } from '@/api/publication';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const {
    link,
  } = to.params;

  try {
    const result = await apiLinkPublication(link as string);

    return !!result;
  } catch (error: any) {
    return false;
  }
});
