import ITeacherExperience from '@/interfaces/stores/course/teacherExperience';
import IImage from '@/interfaces/stores/image/image';
import TId from '@/types/id';

export default interface IProperty {
  id: TId,
  name: string,
  link?: string,
  disabled?: null,
  image_middle_id?: IImage | null,
  experiences?: ITeacherExperience[],
}
