import { storeToRefs } from 'pinia';

import { IResponseItems } from '@/interfaces/response';
import ISchool from '@/interfaces/stores/school/school';
import school from '@/stores/school';

// eslint-disable-next-line import/prefer-default-export
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
