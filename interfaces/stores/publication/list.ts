import type IPublication from '@/interfaces/stores/publication/publication';
import type IYear from '@/interfaces/stores/publication/year';

export default interface IList {
  years: Array<IYear>,
  total: number,
  year: number | null,
  publications: Array<IPublication>,
}
