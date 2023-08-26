import IFilters from '@/interfaces/filters';
import { IResponseItem, IResponseItems } from '@/interfaces/response';
import IFilterTeacher from '@/interfaces/stores/course/filterTeacher';
import teacher from '@/stores/teacher';
import TId from '@/types/id';

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
    Promise<IResponseItems<IFilterTeacher>> => readTeachers(apiUrl, offset, limit, filters);

  const resultTeachers = await useAsyncData('teachers', async () => loadTeachers());

  return resultTeachers.data.value?.data || [];
};

export const apiGetTeacher = async (
  apiUrl: string,
  id: TId,
): Promise<IFilterTeacher | null> => {
  const {
    getTeacher,
  } = teacher();

  const loadTeacher = async ():
    Promise<IResponseItem<IFilterTeacher | null>> => getTeacher(apiUrl, id);

  const resultTeacher = await useAsyncData('teacher', async () => loadTeacher());

  return resultTeacher.data.value?.data || null;
};

export const apiLinkTeacher = async (
  apiUrl: string,
  link: string,
): Promise<IFilterTeacher | null> => {
  const {
    linkTeacher,
  } = teacher();

  const loadTeacher = async ():
    Promise<IResponseItem<IFilterTeacher | null>> => linkTeacher(apiUrl, link);

  const resultTeacher = await useAsyncData('teacher', async () => loadTeacher());

  return resultTeacher.data.value?.data || null;
};
