import { apiGetCourse } from '@/api/course';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const config = useRuntimeConfig();
  const {
    school,
    course,
  } = to.params;

  const result = await apiGetCourse(
    config.public.apiUrl,
    config.public.development,
    school as string,
    course as string,
  );

  return !!result;
});
