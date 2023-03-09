import { apiLinkTeacher } from '@/api/teacher';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const config = useRuntimeConfig();
  const {
    link,
  } = to.params;

  const result = await apiLinkTeacher(config.public.apiUrl, link as string);

  return !!result;
});
