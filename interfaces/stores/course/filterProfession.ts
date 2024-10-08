import type TId from '@/types/id';

export default interface IFilterProfession {
  id: TId,
  name: string,
  link: string,
  disabled?: boolean,
}
