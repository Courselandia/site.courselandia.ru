import ECurrency from '@/enums/stores/course/currency';
import EDuration from '@/enums/stores/course/duration';
import ELanguage from '@/enums/stores/course/language';
import type IEmployment from '@/interfaces/stores/course/employment';
import type IFeature from '@/interfaces/stores/course/feature';
import type ILearn from '@/interfaces/stores/course/learn';
import type ILevel from '@/interfaces/stores/course/level';
import type IProcess from '@/interfaces/stores/course/process';
import type IProfession from '@/interfaces/stores/course/profession';
import type IProgram from '@/interfaces/stores/course/program';
import type IProperty from '@/interfaces/stores/course/property';
import type IImage from '@/interfaces/stores/image/image';
import type IMetatag from '@/interfaces/stores/metatag/metatag';
import type ISchool from '@/interfaces/stores/school/school';
import type TId from '@/types/id';

export default interface ICourse {
  id: TId;
  uuid: string;
  metatag_id: TId;
  school_id: TId;
  image_big_id: IImage | null;
  image_middle_id: IImage | null;
  image_small_id: IImage | null;
  name: string;
  header: string;
  text: string | null;
  name_morphy: string;
  text_morphy: string | null;
  link: string;
  url: string;
  language: ELanguage | null;
  rating: number | null;
  price: number | null;
  price_old: number | null;
  price_recurrent: number | null;
  currency: ECurrency | null;
  online: boolean | null;
  employment: boolean | null;
  duration: number | null;
  duration_rate: number | null;
  duration_unit: EDuration | null;
  lessons_amount: number | null;
  modules_amount: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  school: ISchool | null;
  directions: Array<IProperty> | null,
  professions: Array<IProfession> | null,
  categories: Array<IProperty> | null,
  skills: Array<IProperty> | null,
  teachers: Array<IProperty> | null,
  tools: Array<IProperty> | null,
  levels: Array<ILevel> | null,
  metatag?: IMetatag | null,
  processes: Array<IProcess>,
  learns: Array<ILearn>,
  employments?: Array<IEmployment>,
  features?: Array<IFeature>,
  program?: Array<IProgram>,
}
