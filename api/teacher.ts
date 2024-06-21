import type IFilters from '@/interfaces/filters';
import type { IResponseItem, IResponseItems } from '@/interfaces/response';
import type IFilterTeacher from '@/interfaces/stores/course/filterTeacher';
import type ITeacherLink from '@/interfaces/stores/course/teacherLink';
import teacher from '@/stores/teacher';

export const apiReadTeachers = async (
  offset: number | null = null,
  limit: number | null = null,
  filters: IFilters | null = null,
): Promise<Array<IFilterTeacher>> => {
  const {
    readTeachers,
  } = teacher();

  const loadTeachers = async ():
    Promise<IResponseItems<IFilterTeacher>> => readTeachers(
    offset,
    limit,
    filters,
  );

  const resultTeachers = await useAsyncData('teachers', async () => loadTeachers());

  return resultTeachers.data.value?.data || [];
};

export const apiLinkTeacher = async (
  link: string,
): Promise<ITeacherLink | null> => {
  const {
    linkTeacher,
  } = teacher();

  const loadTeachers = async ():
    Promise<IResponseItem<ITeacherLink>> => linkTeacher(
    link,
  );

  const resultTeacher = await useAsyncData('teacher', async () => loadTeachers());

  return resultTeacher.data.value?.data || null;
};
