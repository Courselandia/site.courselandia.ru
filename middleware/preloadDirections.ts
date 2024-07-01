import { apiReadDirections } from '@/api/direction';

export default defineNuxtRouteMiddleware(async (to): Promise<void> => {
  try {
    await apiReadDirections();
  } catch (error: any) {
    console.error(error.message);
  }
});
