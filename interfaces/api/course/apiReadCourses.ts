import ICourse from '@/interfaces/stores/course/course';
import IDescription from '@/interfaces/stores/course/description';
import IFilter from '@/interfaces/stores/course/filter';

export default interface IApiReadCourses {
  courses: Array<ICourse>,
  filter: IFilter | null,
  section: string | null,
  description: IDescription | null,
  total: number | null,
}
