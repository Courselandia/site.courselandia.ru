import ITeacher from '@/interfaces/components/molecules/teacher';
import IFilterTeacher from '@/interfaces/stores/course/filterTeacher';

export const courseFilterStoreTeachersToComponentTeachers = (
  teachers: Array<IFilterTeacher>,
): Array<ITeacher> => {
  const result: Array<ITeacher> = [];

  teachers.forEach((teacher) => {
    result[result.length] = {
      id: teacher.id,
      label: teacher.name,
      link: teacher.link,
    };
  });

  return result;
};
