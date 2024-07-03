import { apiReadCourseSchools } from '@/api/school';

export default defineNuxtRouteMiddleware(async (to): Promise<void> => {
  try {
    await apiReadCourseSchools();
  } catch (error: any) {
    console.error(error.message);
  }
});
