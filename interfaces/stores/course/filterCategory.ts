import type TId from '@/types/id';

export default interface IFilterCategory {
  id: TId,
  name: string,
  link: string,
  disabled?: boolean,
}
