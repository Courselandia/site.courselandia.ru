import IMenu from '@/interfaces/menu';
import IDirection from '@/interfaces/stores/course/direction';
import TId from '@/types/id';

const directionsToMenu = async (
  directions: Array<IDirection>,
  addAllCourse: boolean = false,
): Promise<Array<IMenu>> => {
  const images: Record<TId, string> = {
    0: await import('@/assets/images/directions/all.svg'),
    1: await import('@/assets/images/directions/programmirovanie.svg'),
    2: await import('@/assets/images/directions/marketing.svg'),
    3: await import('@/assets/images/directions/dizayn.svg'),
    4: await import('@/assets/images/directions/biznes-i-upravlenie.svg'),
    5: await import('@/assets/images/directions/analitika.svg'),
    6: await import('@/assets/images/directions/igri.svg'),
    7: await import('@/assets/images/directions/drugie-professii.svg'),
  };

  let countAll: number = 0;

  directions.forEach((direction) => {
    countAll += direction.count;
  });

  const result: Array<IMenu> = [];

  if (addAllCourse) {
    result[result.length] = {
      label: 'Все курсы',
      path: '/courses',
      image: images[0],
      amount: countAll,
    };
  }

  directions.forEach((direction) => {
    const index = result.length;

    result[index] = {
      label: direction.name,
      path: `/courses/direction/${direction.link}`,
      amount: direction.count,
      image: images[direction.id] || undefined,
      children: [],
    };

    if (direction.categories) {
      const children: Array<IMenu> = [];

      direction.categories.forEach((category) => {
        if (result[index].children !== undefined) {
          children[children.length] = {
            label: category.name,
            path: `/courses/category/${category.link}`,
          };
        }
      });

      result[index].children = children;
    }
  });

  return result;
};

export default directionsToMenu;
