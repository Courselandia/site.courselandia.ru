import { courseStoreToCourseComponent } from '@/converts/courseStoreToCourseComponent';
import ICourseComponent from '@/interfaces/components/molecules/course';
import ICourseStore from '@/interfaces/stores/course/course';

// eslint-disable-next-line import/prefer-default-export
export const coursesStoreToCoursesComponent = (
  courses: Array<ICourseStore>,
): Array<ICourseComponent> => {
  const result: Array<ICourseComponent> = [];

  courses.forEach((item) => {
    const index = result.length;
    result[index] = courseStoreToCourseComponent(item);
  });

  return result;
};
