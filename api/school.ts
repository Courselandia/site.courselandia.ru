import { storeToRefs } from 'pinia';

import { IResponseItem, IResponseItems } from '@/interfaces/response';
import IFilterSchool from '@/interfaces/stores/course/filterSchool';
import ISchoolLink from '@/interfaces/stores/course/schoolLink';
import ISchool from '@/interfaces/stores/school/school';
import school from '@/stores/school';
import TId from '@/types/id';

export const apiReadSchools = async (
  apiUrl: string,
  development: boolean,
): Promise<Array<ISchool>> => {
  const {
    readSchools,
  } = school();

  const loadSchools = async ():
    Promise<IResponseItems<ISchool>> => readSchools(apiUrl, development);

  const { schools } = storeToRefs(school());

  if (schools.value) {
    return schools.value;
  }

  const resultSchools = await useAsyncData('schools', async () => loadSchools());

  return resultSchools.data.value?.data || [];
};

export const apiLinkSchool = async (
  apiUrl: string,
  development: boolean,
  link: string,
): Promise<ISchoolLink | null> => {
  const {
    linkSchool,
  } = school();

  const loadSchool = async ():
    Promise<IResponseItem<ISchoolLink | null>> => linkSchool(apiUrl, development, link);

  const resultCategories = await useAsyncData('school', async () => loadSchool());

  return resultCategories.data.value?.data || null;
};
