import { courseStoreToCourseComponent } from '@/converts/courseStoreToCourseComponent';
import type ICourseComponent from '@/interfaces/components/molecules/course';
import type ICourseStore from '@/interfaces/stores/course/course';

export const coursesStoreToCoursesComponent = (
  courses: Array<ICourseStore>,
): Array<ICourseComponent> => {
  const result: Array<ICourseComponent> = [];

  courses?.forEach((item) => {
    const index = result.length;
    result[index] = courseStoreToCourseComponent(item);
  });

  return result;
};
