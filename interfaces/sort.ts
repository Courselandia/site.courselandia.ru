import type { TOrder } from '@/types/order';

export default interface ISort {
  sortBy: string,
  sortOrder: TOrder,
}
