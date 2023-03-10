import { apiLinkSkill } from '@/api/skill';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const config = useRuntimeConfig();
  const {
    link,
  } = to.params;

  const result = await apiLinkSkill(config.public.apiUrl, link as string);

  return !!result;
});
