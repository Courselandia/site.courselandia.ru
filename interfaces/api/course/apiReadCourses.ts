import type ICategoryLink from '@/interfaces/stores/course/categoryLink';
import type ICourse from '@/interfaces/stores/course/course';
import type IDirectionLink from '@/interfaces/stores/course/directionLink';
import type IFilter from '@/interfaces/stores/course/filter';
import type IProfessionLink from '@/interfaces/stores/course/professionLink';
import type ISchoolLink from '@/interfaces/stores/course/schoolLink';
import type ISkillLink from '@/interfaces/stores/course/skillLink';
import type ITeacherLink from '@/interfaces/stores/course/teacherLink';
import type IToolLink from '@/interfaces/stores/course/toolLink';

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
