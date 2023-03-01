import EFormat from '@/enums/stores/course/format';
import ELevel from '@/enums/stores/course/level';
import IFilterCategory from '@/interfaces/stores/course/filterCategory';
import IFilterDirection from '@/interfaces/stores/course/filterDirection';
import IFilterDuration from '@/interfaces/stores/course/filterDuration';
import IFilterPrice from '@/interfaces/stores/course/filterPrice';
import IFilterProfession from '@/interfaces/stores/course/filterProfession';
import IFilterSchool from '@/interfaces/stores/course/filterSchool';
import IFilterSkill from '@/interfaces/stores/course/filterSkill';
import IFilterTeacher from '@/interfaces/stores/course/filterTeacher';
import IFilterTool from '@/interfaces/stores/course/filterTool';

export default interface IFilter {
  directions: Array<IFilterDirection>,
  categories: Array<IFilterCategory>,
  professions: Array<IFilterProfession>,
  schools: Array<IFilterSchool>,
  tools: Array<IFilterTool>,
  skills: Array<IFilterSkill>,
  teachers: Array<IFilterTeacher>,
  ratings: Array<number>,
  price: IFilterPrice,
  duration: IFilterDuration,
  credit: boolean,
  free: boolean,
  formats: Array<EFormat>,
  levels: Array<ELevel>,
}
