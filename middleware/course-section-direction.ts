import { apiLinkDirection } from '@/api/direction';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const config = useRuntimeConfig();
  const {
    link,
  } = to.params;

  const result = await apiLinkDirection(config.public.apiUrl, link as string);

  return !!result;
});
