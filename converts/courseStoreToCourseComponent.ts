import level from '@/helpers/level';
import type ICourseComponent from '@/interfaces/components/modules/course';
import type ICourseStore from '@/interfaces/stores/course/course';

export const courseStoreToCourseComponent = (
  course: ICourseStore,
): ICourseComponent => ({
  id: course.id,
  name: course.name,
  header: course.header,
  link: `/courses/show/${course.school?.link}/${course.link}`,
  url: course.url,
  rating: course.rating,
  image: course.image_middle_id || null,
  price: course.price,
  price_old: course.price_old,
  price_recurrent: course.price_recurrent,
  currency: course.currency,
  duration: course.duration,
  duration_unit: course.duration_unit,
  modules_amount: course.modules_amount,
  lessons_amount: course.lessons_amount,
  text: course.text,
  language: course.language,
  online: course.online,
  employment: course.employment,
  school: course.school ? {
    id: course.school.id,
    name: course.school.name,
    image: course.school.image_logo_id?.path || null,
    link: `/courses/school/${course.school?.link}`,
  } : null,
  metatag: course.metatag ? {
    description: course.metatag.description,
    keywords: course.metatag.keywords,
    title: course.metatag.title,
  } : null,
  directions: course.directions ? course.directions.map((direction) => ({
    id: direction.id,
    name: direction.name,
    link: `/courses/direction/${direction.link}`,
  })) : null,
  professions: course.professions ? course.professions.map((profession) => ({
    id: profession.id,
    label: profession.name,
    link: `/courses/profession/${profession.link}`,
    salaries: profession?.salaries?.map((salary) => ({
      id: salary.id,
      level: salary.level,
      salary: salary.salary,
    })),
  })) : null,
  categories: course.categories ? course.categories.map((category) => ({
    id: category.id,
    label: category.name,
    link: `/courses/category/${category.link}`,
  })) : null,
  skills: course.skills ? course.skills.map((skill) => ({
    id: skill.id,
    label: skill.name,
    link: `/courses/skill/${skill.link}`,
  })) : null,
  teachers: course.teachers ? course.teachers.map((teacher) => ({
    id: teacher.id,
    label: teacher.name,
    link: `/courses/teacher/${teacher.link}`,
    image: teacher.image_middle_id,
    extra: teacher.experiences?.length ? teacher.experiences[0].position : undefined,
  })) : null,
  tools: course.tools ? course.tools.map((tool) => ({
    id: tool.id,
    label: tool.name,
    link: `/courses/tool/${tool.link}`,
  })) : null,
  processes: course.processes ? course.processes.map((process) => ({
    name: process.name,
    text: process.text,
  })) : null,
  levels: course.levels ? course.levels.map((itm) => ({
    label: level(itm.level) || '',
    value: itm.level,
  })) : null,
  learns: course.learns ? course.learns.map((learn) => ({
    text: learn.text,
  })) : null,
  employments: course.employments ? course.employments.map((employment) => ({
    name: employment.name,
    text: employment.text,
  })) : null,
  features: course.features ? course.features.map((feature) => ({
    icon: feature.icon,
    text: feature.text,
  })) : null,
  program: course.program ? course.program.map((program) => ({
    name: program.name,
    text: program.text,
    children: program.children,
  })) : null,
});
