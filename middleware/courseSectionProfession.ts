import { apiLinkProfession } from '@/api/profession';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const config = useRuntimeConfig();
  const {
    link,
  } = to.params;

  const result = await apiLinkProfession(config.public.apiUrl, link as string);

  return !!result;
});
