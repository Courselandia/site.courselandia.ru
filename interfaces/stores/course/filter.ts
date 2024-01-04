import EFormat from '@/enums/stores/course/format';
import ELevel from '@/enums/stores/course/level';
import type IFilterCategory from '@/interfaces/stores/course/filterCategory';
import type IFilterDirection from '@/interfaces/stores/course/filterDirection';
import type IFilterDuration from '@/interfaces/stores/course/filterDuration';
import type IFilterPrice from '@/interfaces/stores/course/filterPrice';
import type IFilterProfession from '@/interfaces/stores/course/filterProfession';
import type IFilterSchool from '@/interfaces/stores/course/filterSchool';
import type IFilterSkill from '@/interfaces/stores/course/filterSkill';
import type IFilterTeacher from '@/interfaces/stores/course/filterTeacher';
import type IFilterTool from '@/interfaces/stores/course/filterTool';
import type IRating from '@/interfaces/stores/course/rating';

export default interface IFilter {
  directions: Array<IFilterDirection>,
  categories: Array<IFilterCategory>,
  professions: Array<IFilterProfession>,
  schools: Array<IFilterSchool>,
  tools: Array<IFilterTool>,
  skills: Array<IFilterSkill>,
  teachers: Array<IFilterTeacher>,
  ratings: Array<IRating>,
  price: IFilterPrice,
  duration: IFilterDuration,
  credit: boolean,
  free: boolean,
  formats: Array<EFormat>,
  levels: Array<ELevel>,
}
