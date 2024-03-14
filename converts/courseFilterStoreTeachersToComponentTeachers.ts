import type ITeacher from '@/interfaces/components/modules/catalog/teacher';
import type IFilterTeacher from '@/interfaces/stores/course/filterTeacher';

export const courseFilterStoreTeachersToComponentTeachers = (
  teachers: Array<IFilterTeacher>,
): Array<ITeacher> => {
  const result: Array<ITeacher> = [];

  teachers.forEach((teacher) => {
    result[result.length] = {
      id: teacher.id,
      label: teacher.name,
      link: teacher.link,
      disabled: teacher.disabled,
    };
  });

  return result;
};
