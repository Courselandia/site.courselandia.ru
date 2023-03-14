import IImage from '@/interfaces/stores/image/image';
import IMetatag from '@/interfaces/stores/metatag/metatag';
import TId from '@/types/id';

export default interface ISchoolLink {
  id: TId;
  name: string,
  link: string,
  header: string,
  weight: number,
  text: string,
  metatag: IMetatag | null,
  status: boolean,
  created_at: string;
  updated_at: string;
  deleted_at: string,
  image_logo_id: IImage | null;
  image_site_id: IImage | null;
  site: number | null,
  rating: number | null,
}
