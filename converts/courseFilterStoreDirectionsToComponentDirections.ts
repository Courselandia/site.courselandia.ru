import IDirection from '@/interfaces/components/molecules/direction';
import IFilterDirection from '@/interfaces/stores/course/filterDirection';

export const courseFilterStoreDirectionsToComponentDirections = (
  directions: Array<IFilterDirection>,
): Array<IDirection> => {
  const result: Array<IDirection> = [];

  directions.forEach((direction) => {
    result[result.length] = {
      id: direction.id,
      name: direction.name,
      link: direction.link,
      disabled: direction.disabled,
    };
  });

  return result;
};
