import type IFilters from '@/interfaces/filters';
import type { IResponseItem, IResponseItems } from '@/interfaces/response';
import type ISchoolLink from '@/interfaces/stores/course/schoolLink';
import type ISchool from '@/interfaces/stores/school/school';
import school from '@/stores/school';

export const apiReadSchools = async (): Promise<Array<ISchool>> => {
  const {
    readSchools,
  } = school();

  const loadSchools = async ():
    Promise<IResponseItems<ISchool>> => readSchools();

  const resultSchools = await useAsyncData('schools', async () => loadSchools());

  return resultSchools.data.value?.data || [];
};

export const apiReadCourseSchools = async (
  offset: number | null = null,
  limit: number | null = null,
  filters: IFilters | null = null,
): Promise<Array<ISchool>> => {
  const {
    readCourseSchools,
  } = school();

  const loadCourseSchools = async ():
    Promise<IResponseItems<ISchool>> => readCourseSchools(offset, limit, filters);

  const resultSchools = await useAsyncData('courseSchools', async () => loadCourseSchools());

  return resultSchools.data.value?.data || [];
};

export const apiLinkSchool = async (
  link: string,
): Promise<ISchoolLink | null> => {
  const {
    linkSchool,
  } = school();

  const loadSchool = async ():
    Promise<IResponseItem<ISchoolLink>> => linkSchool(link as string);

  const resultSchool = await useAsyncData('school', async () => loadSchool());

  return resultSchool.data.value?.data || null;
};
