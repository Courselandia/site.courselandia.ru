import type TId from '@/types/id';

export default interface IPromotion {
  id: TId,
  school_id: TId,
  uuid: string | null,
  title: string,
  description: string | null,
  date_start: number | null,
  date_end: number | null,
  url: string,
  status: boolean,
  created_at: string,
  updated_at: string,
  deleted_at: number | null,
}
