import type TId from '@/types/id';

export default interface ISectionItemLink {
  id: TId;
  section_id: TId;
  weight: number,
  itemable_id: TId;
  itemable_type: string,
  type: string,
}
