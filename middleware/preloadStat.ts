import { apiGetStatCourses } from '@/api/course';

export default defineNuxtRouteMiddleware(async (): Promise<void> => {
  try {
    await apiGetStatCourses();
  } catch (error: any) {
    console.error(error.message);
  }
});
