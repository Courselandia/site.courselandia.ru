import ICourseComponent from '@/interfaces/components/molecules/course';
import ICourseStore from '@/interfaces/stores/course/course';

// eslint-disable-next-line import/prefer-default-export
export const courseStoreToCourseComponent = (
  course: ICourseStore,
): ICourseComponent => ({
  id: course.id,
  name: course.header,
  link: `courses/course/${course.school?.link}/${course.link}`,
  url: course.url,
  rating: course.rating,
  image: course.image_middle_id?.path || null,
  price: course.price,
  price_old: course.price_old,
  price_recurrent_price: course.price_recurrent_price,
  currency: course.currency,
  duration: course.duration,
  duration_unit: course.duration_unit,
  lessons_amount: course.lessons_amount,
  school: course.school ? {
    name: course.school.name,
    image: course.school.image_logo_id?.path || null,
    link: `courses/school/${course.school?.link}`,
  } : null,

  text: course.text,
});
