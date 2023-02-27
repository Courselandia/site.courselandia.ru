import ICatalogFilterSelectItem from '@/interfaces/components/molecules/catalogFilterSelectItem';
import ISalary from '@/interfaces/components/molecules/salary';

export default interface IProfession extends ICatalogFilterSelectItem {
  salaries: Array<ISalary>
}
