import type IImage from '@/interfaces/stores/image/image';
import type IMetatag from '@/interfaces/stores/metatag/metatag';
import type TId from '@/types/id';

export default interface IPublication {
  id: TId;
  metatag_id: TId,
  published_at: string,
  header: string,
  link: string,
  anons: string | null,
  article: string | null,
  image_small: IImage | null;
  image_middle: IImage | null;
  image_big: IImage | null;
  metatag: IMetatag | null,
  created_at: string,
  updated_at: string,
  deleted_at: string | null,
}
