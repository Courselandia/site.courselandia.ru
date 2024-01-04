import type IProperty from '@/interfaces/stores/course/property';
import type ISalary from '@/interfaces/stores/course/salary';

export default interface IProfession extends IProperty {
  salaries: Array<ISalary>,
}
