import ICategory from '@/interfaces/components/molecules/category';
import IFilterCategory from '@/interfaces/stores/course/filterCategory';

export const courseFilterStoreCategoriesToComponentCategories = (
  categories: Array<IFilterCategory>,
): Array<ICategory> => {
  const result: Array<ICategory> = [];

  categories.forEach((category) => {
    result[result.length] = {
      id: category.id,
      label: category.name,
      link: category.link,
    };
  });

  return result;
};
