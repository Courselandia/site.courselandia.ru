import type IFilterSelectItem from '@/interfaces/components/modules/catalog/filterSelectItem';
import type ISalary from '@/interfaces/components/modules/course/salary';

export default interface IProfession extends IFilterSelectItem {
  salaries?: Array<ISalary>
}
