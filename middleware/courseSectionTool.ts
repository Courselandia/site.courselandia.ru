import { apiLinkTool } from '@/api/tool';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const config = useRuntimeConfig();
  const {
    link,
  } = to.params;

  const result = await apiLinkTool(config.public.apiUrl, link as string);

  return !!result;
});
