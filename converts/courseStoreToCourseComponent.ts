import ICourseComponent from '@/interfaces/components/molecules/course';
import ICourseStore from '@/interfaces/stores/course/course';

// eslint-disable-next-line import/prefer-default-export
export const courseStoreToCourseComponent = (
  courses: Array<ICourseStore>,
): Array<ICourseComponent> => {
  const result: Array<ICourseComponent> = [];

  courses.forEach((item) => {
    const index = result.length;

    result[index] = {
      id: item.id,
      name: item.header,
      link: `courses/course/${item.school?.link}/${item.link}`,
      url: item.url,
      rating: item.rating,
      image: item.image_middle_id?.path || null,
      price: item.price,
      price_old: item.price_old,
      price_recurrent_price: item.price_recurrent_price,
      currency: item.currency,
      duration: item.duration,
      duration_unit: item.duration_unit,
      lessons_amount: item.lessons_amount,
      school: item.school ? {
        name: item.school.name,
        image: item.school.image_logo_id?.path || null,
        link: `courses/school/${item.school?.link}`,
      } : null,
    };
  });

  return result;
};
