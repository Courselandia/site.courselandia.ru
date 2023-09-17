import IFilters from '@/interfaces/filters';
import { IResponseItem, IResponseItems } from '@/interfaces/response';
import IFilterTeacher from '@/interfaces/stores/course/filterTeacher';
import ITeacherLink from '@/interfaces/stores/course/teacherLink';
import teacher from '@/stores/teacher';
import TId from '@/types/id';

export const apiReadTeachers = async (
  apiUrl: string,
  development: boolean,
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
    development,
    offset,
    limit,
    filters,
  );

  const resultTeachers = await useAsyncData('teachers', async () => loadTeachers());

  return resultTeachers.data.value?.data || [];
};

export const apiGetTeacher = async (
  apiUrl: string,
  development: boolean,
  id: TId,
): Promise<IFilterTeacher | null> => {
  const {
    getTeacher,
  } = teacher();

  const loadTeacher = async ():
    Promise<IResponseItem<IFilterTeacher | null>> => getTeacher(apiUrl, development, id);

  const resultTeacher = await useAsyncData('teacher', async () => loadTeacher());

  return resultTeacher.data.value?.data || null;
};

export const apiLinkTeacher = async (
  apiUrl: string,
  development: boolean,
  link: string,
): Promise<ITeacherLink | null> => {
  const {
    linkTeacher,
  } = teacher();

  const loadTeacher = async ():
    Promise<IResponseItem<ITeacherLink | null>> => linkTeacher(apiUrl, development, link);

  const resultTeacher = await useAsyncData('teacher', async () => loadTeacher());

  return resultTeacher.data.value?.data || null;
};
