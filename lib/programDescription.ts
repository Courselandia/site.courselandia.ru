import duration from '@/helpers/duration';
import type ICourse from '@/interfaces/components/modules/course';

const programDescription = (course: ICourse): string | null => {
  let text = '';

  if (course.duration && course.duration_unit) {
    text += `Программа курса расчитана на ${duration(course.duration, course.duration_unit)}.`;
  }

  if (course.modules_amount || course.lessons_amount) {
    if (course.modules_amount) {
      text += ' В курсе ';

      if (course.modules_amount === 1) {
        text += 'представлен ';
      } else {
        text += 'представлено ';
      }

      text += course.modules_amount;

      if (course.modules_amount === 1) {
        text += ` модуль${course.lessons_amount ? ', который' : ','}`;
      } else if (course.modules_amount >= 2 && course.modules_amount <= 4) {
        text += ` модуля${course.lessons_amount ? ', которые' : ','}`;
      } else {
        text += ` модулей${course.lessons_amount ? ', которые' : ','}`;
      }

      if (course.lessons_amount) {
        text += ` содержат ${course.lessons_amount} `;

        if (course.lessons_amount === 1) {
          text += 'онлайн-курс,';
        } else if (course.lessons_amount >= 2 && course.lessons_amount <= 4) {
          text += 'онлайн-курса,';
        } else {
          text += 'онлайн-курсов,';
        }
      }
    } else if (course.lessons_amount) {
      text += ' В курсе ';

      text += course.lessons_amount;

      if (course.lessons_amount === 1) {
        text += ' онлайн-курс,';
      } else if (course.lessons_amount >= 2 && course.lessons_amount <= 4) {
        text += ' онлайн-курса,';
      } else {
        text += ' онлайн-курсов,';
      }
    }

    text += ` что ${course.lessons_amount === 1 ? 'состоит' : 'состоят'} из видеолекций и практических заданий, которые вы разберете вместе со спикерами.`;
  }

  return text !== '' ? text : null;
};

export default programDescription;
