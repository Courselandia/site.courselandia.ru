import type ICourseStore from '@/interfaces/stores/course/course';
import type IDirection from '@/interfaces/stores/course/directionLink';
import type IImage from '@/interfaces/stores/image/image';
import type IMetatag from '@/interfaces/stores/metatag/metatag';
import type TId from '@/types/id';

export default interface ICollection {
  id: TId;
  metatag_id: TId,
  direction_id: TId;
  name: string,
  link: string,
  text: string | null,
  additional: string | null,
  amount: number,
  sort_field: string,
  sort_direction: string,
  copied: boolean,
  image_small: IImage | null;
  image_middle: IImage | null;
  image_big: IImage | null;
  status: boolean,
  metatag: IMetatag | null,
  direction: IDirection,
  created_at: string,
  updated_at: string,
  deleted_at: string | null,
  courses: Array<ICourseStore>,
}
