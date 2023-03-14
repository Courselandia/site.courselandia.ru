import IDirectionLink from '@/interfaces/stores/course/directionLink';
import IProfessionLink from '@/interfaces/stores/course/professionLink';
import IMetatag from '@/interfaces/stores/metatag/metatag';
import TId from '@/types/id';

export default interface ICategoryLink {
  id: TId;
  name: string,
  link: string,
  header: string,
  text: string,
  metatag: IMetatag | null,
  status: boolean,
  created_at: string;
  updated_at: string;
  deleted_at: string,
  directions: Array<IDirectionLink>,
  professions: Array<IProfessionLink>,
}
