import { apiLinkCategory } from '@/api/category';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const config = useRuntimeConfig();
  const {
    link,
  } = to.params;

  const result = await apiLinkCategory(config.public.apiUrl, link as string);

  return !!result;
});
