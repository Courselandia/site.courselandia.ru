import ICategoryLink from '@/interfaces/stores/course/categoryLink';
import ICourse from '@/interfaces/stores/course/course';
import IDirectionLink from '@/interfaces/stores/course/directionLink';
import IFilter from '@/interfaces/stores/course/filter';
import IProfessionLink from '@/interfaces/stores/course/professionLink';
import ISchoolLink from '@/interfaces/stores/course/schoolLink';
import ISkillLink from '@/interfaces/stores/course/skillLink';
import ITeacherLink from '@/interfaces/stores/course/teacherLink';
import IToolLink from '@/interfaces/stores/course/toolLink';

export default interface IApiReadCourses {
  courses: Array<ICourse>,
  filter: IFilter | null,
  section: string | null,
  description: ICategoryLink
    | IDirectionLink
    | IProfessionLink
    | ISchoolLink
    | ISkillLink
    | ITeacherLink
    | IToolLink
    | null,
  total: number | null,
}
