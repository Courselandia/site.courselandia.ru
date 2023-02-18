import ICategory from '@/interfaces/stores/course/category';
import TId from '@/types/id';

export default interface IDirection {
  id: TId;
  name: string,
  link: string,
  count: number,
  categories: Array<ICategory>,
}
