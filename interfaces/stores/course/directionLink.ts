// eslint-disable-next-line import/no-cycle
import ICategoryLink from '@/interfaces/stores/course/categoryLink';
import IMetatag from '@/interfaces/stores/metatag/metatag';
import TId from '@/types/id';

export default interface IDirectionLink {
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
  categories: Array<ICategoryLink>,
}
