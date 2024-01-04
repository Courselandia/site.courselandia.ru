import type ICourse from '@/interfaces/stores/course/course';

export default interface IApiReadSearchedCourses {
  courses: Array<ICourse>,
  total: number | null,
}
