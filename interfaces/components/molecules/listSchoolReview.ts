import TId from '@/types/id';

export default interface IListSchoolReview {
  id?: TId,
  label: string
  link: string,
  reviews: number,
  rating: number,
}
