import IFilters from '@/interfaces/filters';
import { IResponseItems } from '@/interfaces/response';
import IFilterTeacher from '@/interfaces/stores/course/filterTeacher';
import teacher from '@/stores/teacher';

export const apiReadTeachers = async (
  apiUrl: string,
  offset: number | null = null,
  limit: number | null = null,
  filters: IFilters | null = null,
): Promise<Array<IFilterTeacher>> => {
  const {
    readTeachers,
  } = teacher();

  const loadTeachers = async ():
    Promise<IResponseItems<IFilterTeacher>> => readTeachers(
    apiUrl,
    offset,
    limit,
    filters,
  );

  const resultTeachers = await useAsyncData('teachers', async () => loadTeachers());

  return resultTeachers.data.value?.data || [];
};
