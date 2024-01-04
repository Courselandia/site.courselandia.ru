import type TId from '@/types/id';

export default interface IFilterSchool {
  id: TId,
  name: string,
  link: string,
  disabled?: boolean,
}
