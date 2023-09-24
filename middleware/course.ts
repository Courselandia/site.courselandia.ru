import { apiGetCourse } from '@/api/course';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const {
    school,
    course,
  } = to.params;

  const result = await apiGetCourse(
    school as string,
    course as string,
  );

  return !!result;
});
