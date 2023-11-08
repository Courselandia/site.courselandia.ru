import ELevel from '@/enums/stores/course/level';
import IImage from '@/interfaces/stores/image/image';
import TId from '@/types/id';

export default interface ICatalogFilterSelectItem {
  id: TId,
  label?: string,
  link?: string,
  value?: ELevel,
  disabled?: boolean,
  image?: IImage | null,
  extra?: string,
}
