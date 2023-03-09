import { apiLinkSchool } from '@/api/school';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const config = useRuntimeConfig();
  const {
    link,
  } = to.params;

  const result = await apiLinkSchool(config.public.apiUrl, link as string);

  return !!result;
});
