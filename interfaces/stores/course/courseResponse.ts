import ICourse from '@/interfaces/stores/course/course';

export default interface ICourseResponse {
  course: ICourse;
  similarities: ICourse[],
}
