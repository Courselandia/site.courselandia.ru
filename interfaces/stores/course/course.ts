import ECurrency from '@/enums/stores/course/currency';
import EDuration from '@/enums/stores/course/duration';
import ELanguage from '@/enums/stores/course/language';
import ILevel from '@/interfaces/stores/course/level';
import IProperty from '@/interfaces/stores/course/property';
import IImage from '@/interfaces/stores/image/image';
import ISchool from '@/interfaces/stores/school/school';
import TId from '@/types/id';

export default interface ICourse {
  id: TId;
  uuid: string;
  metatag_id: TId;
  school_id: TId;
  image_big_id: IImage | null;
  image_middle_id: IImage | null;
  image_small_id: IImage | null;
  header: string;
  text: string | null;
  header_morphy: string;
  text_morphy: string | null;
  link: string;
  url: string;
  language: ELanguage | null;
  rating: number | null;
  price: number | null;
  price_old: number | null;
  price_recurrent_price: number | null;
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
  professions: Array<IProperty> | null,
  categories: Array<IProperty> | null,
  skills: Array<IProperty> | null,
  teachers: Array<IProperty> | null,
  tools: Array<IProperty> | null,
  levels: Array<ILevel> | null,
}
