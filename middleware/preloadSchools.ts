import { apiReadSchools } from '@/api/school';

export default defineNuxtRouteMiddleware(async (to): Promise<void> => {
  try {
    await apiReadSchools();
  } catch (error: any) {
    console.error(error.message);
  }
});
