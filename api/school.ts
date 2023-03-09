import { storeToRefs } from 'pinia';

import { IResponseItem, IResponseItems } from '@/interfaces/response';
import IFilterSchool from '@/interfaces/stores/course/filterSchool';
import ISchool from '@/interfaces/stores/school/school';
import school from '@/stores/school';
import TId from '@/types/id';

export const apiReadSchools = async (apiUrl: string): Promise<Array<ISchool>> => {
  const {
    readSchools,
  } = school();

  const loadSchools = async ():
    Promise<IResponseItems<ISchool>> => readSchools(apiUrl);

  const { schools } = storeToRefs(school());

  if (schools.value) {
    return schools.value;
  }

  const resultSchools = await useAsyncData('schools', async () => loadSchools());

  return resultSchools.data.value?.data;
};

export const apiGetSchool = async (
  apiUrl: string,
  id: TId,
): Promise<IFilterSchool | null> => {
  const {
    getSchool,
  } = school();

  const loadSchool = async ():
    Promise<IResponseItem<IFilterSchool | null>> => getSchool(apiUrl, id);

  const resultCategories = await useAsyncData('school', async () => loadSchool());

  return resultCategories.data.value?.data || null;
};

export const apiLinkSchool = async (
  apiUrl: string,
  link: string,
): Promise<IFilterSchool | null> => {
  const {
    linkSchool,
  } = school();

  const loadSchool = async ():
    Promise<IResponseItem<IFilterSchool | null>> => linkSchool(apiUrl, link);

  const resultCategories = await useAsyncData('school', async () => loadSchool());

  return resultCategories.data.value?.data || null;
};