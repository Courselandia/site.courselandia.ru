import TId from '@/types/id';

export default interface IFaq {
  id: TId;
  school_id: TId,
  question: string,
  answer: string,
  status: boolean,
  created_at: string,
  updated_at: string,
  deleted_at: string | null,
}
