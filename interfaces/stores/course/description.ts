import IImage from '@/interfaces/stores/image/image';
import TId from '@/types/id';

export default interface IDescription {
  id: TId,
  name: string,
  header: string,
  link: string,
  rating: number,
  image_logo_id: IImage | null,
}
