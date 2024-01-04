import type ICatalogFilterSelectItem from '@/interfaces/components/molecules/catalogFilterSelectItem';
import type ISalary from '@/interfaces/components/molecules/salary';

export default interface IProfession extends ICatalogFilterSelectItem {
  salaries?: Array<ISalary>
}
