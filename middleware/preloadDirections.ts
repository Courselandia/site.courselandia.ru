import { apiReadDirections } from '@/api/direction';

export default defineNuxtRouteMiddleware(async (to): Promise<void> => {
  const config = useRuntimeConfig();

  try {
    await apiReadDirections(config.public.apiUrl, config.public.development);
  } catch (error: any) {
    console.error(error.message);
  }
});
