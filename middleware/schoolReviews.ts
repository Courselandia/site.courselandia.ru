import { apiLinkSchool } from '@/api/school';
import ISchoolLink from '@/interfaces/stores/course/schoolLink';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const config = useRuntimeConfig();

  const {
    link,
  } = to.params;

  try {
    const result: ISchoolLink | null = await apiLinkSchool(
      config.public.apiUrl,
      config.public.development,
      link as string,
    );

    if (!result?.reviews_count) {
      return false;
    }

    return !!result;
  } catch (error: any) {
    return false;
  }
});
