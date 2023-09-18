import { apiReadSchools } from '@/api/school';

export default defineNuxtRouteMiddleware(async (to): Promise<void> => {
  const config = useRuntimeConfig();

  try {
    await apiReadSchools(config.public.apiUrl, config.public.development);
  } catch (error: any) {
    console.error(error.message);
  }
});
