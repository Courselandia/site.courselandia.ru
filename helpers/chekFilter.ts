import ICategory from '@/interfaces/components/molecules/category';
import IDirection from '@/interfaces/components/molecules/direction';
import IFormat from '@/interfaces/components/molecules/format';
import IProfession from '@/interfaces/components/molecules/profession';
import IRating from '@/interfaces/components/molecules/rating';
import ISchool from '@/interfaces/components/molecules/schoolFilter';
import ISkill from '@/interfaces/components/molecules/skill';
import ITeacher from '@/interfaces/components/molecules/teacher';
import ITool from '@/interfaces/components/molecules/tool';
import TId from '@/types/id';
import ELevel from "~/enums/components/molecules/level";
import ILevel from "~/interfaces/components/molecules/level";

export const getDirectionLabel = (
  directions: Array<IDirection>,
  direction: IDirection,
): string | null => directions.find((itm) => itm.id === direction.id)?.name || null;

export const getSchoolLabel = (
  schools: Array<ISchool>,
  school: ISchool,
): string | null => schools.find((itm) => itm.id === school.id)?.label || null;

export const getCategoryLabel = (
  categories: Array<ICategory>,
  category: ICategory,
): string | null => categories.find((itm) => itm.id === category.id)?.label || null;

export const getProfessionLabel = (
  professions: Array<IProfession>,
  profession: IProfession,
): string | null => professions.find((itm) => itm.id === profession.id)?.label || null;

export const getSkillLabel = (
  skills: Array<ISkill>,
  skill: ISkill,
): string | null => skills.find((itm) => itm.id === skill.id)?.label || null;

export const getTeacherLabel = (
  teachers: Array<ISkill>,
  teacher: ITeacher,
): string | null => teachers.find((itm) => itm.id === teacher.id)?.label || null;

export const getToolLabel = (
  tools: Array<ITool>,
  tool: ITool,
): string | null => tools.find((itm) => itm.id === tool.id)?.label || null;

export const getFormatLabel = (
  formats: Array<IFormat>,
  format: IFormat,
): string | null => formats.find((itm) => itm.value === format.value)?.label || null;

export const getRatingLabel = (
  ratings: Array<IRating>,
  rating: TId,
): string | null => {
  const selectedRatingValueFound = ratings.find(
    (itm) => itm.value === rating,
  );

  if (selectedRatingValueFound) {
    return selectedRatingValueFound.label || null;
  }

  return null;
};

export const getLevelLabel = (levels: Array<ILevel>, level: ELevel): string | null => {
  const selectedLevelValueFound = levels.find(
    (itm) => itm.value === level,
  );

  if (selectedLevelValueFound) {
    return selectedLevelValueFound.label || null;
  }

  return null;
};

//

export const hasCategories = (
  categories: Array<ICategory>,
  items: Array<ICategory> | null,
): boolean => {
  let has = false;

  if (items) {
    items.forEach((item) => {
      if (item.label || getCategoryLabel(categories, item)) {
        has = true;
      }
    });
  }

  return has;
};

export const hasRating = (
  ratings: Array<IRating>,
  item: TId | null,
): boolean => (item ? !!getRatingLabel(ratings, item) : false);

export const hasDirection = (
  directions: Array<IDirection>,
  item: IDirection | null,
): boolean => (item ? !!getDirectionLabel(directions, item) : false);

export const hasSchools = (
  schools: Array<ISchool>,
  items: Array<ISchool> | null,
): boolean => {
  let has = false;

  if (items) {
    items.forEach((item) => {
      if (item.label || getSchoolLabel(schools, item)) {
        has = true;
      }
    });
  }

  return has;
};

export const hasProfessions = (
  professions: Array<IProfession>,
  items: Array<IProfession> | null,
): boolean => {
  let has = false;

  if (items) {
    items.forEach((item) => {
      if (item.label || getProfessionLabel(professions, item)) {
        has = true;
      }
    });
  }

  return has;
};

export const hasSkills = (
  skills: Array<ISkill>,
  items: Array<ISkill> | null,
): boolean => {
  let has = false;

  if (items) {
    items.forEach((item) => {
      if (item.label || getSkillLabel(skills, item)) {
        has = true;
      }
    });
  }

  return has;
};

export const hasTeachers = (
  teachers: Array<ITeacher>,
  items: Array<ITeacher> | null,
): boolean => {
  let has = false;

  if (items) {
    items.forEach((item) => {
      if (item.label || getTeacherLabel(teachers, item)) {
        has = true;
      }
    });
  }

  return has;
};

export const hasTools = (
  tools: Array<ITool>,
  items: Array<ITool> | null,
): boolean => {
  let has = false;

  if (items) {
    items.forEach((item) => {
      if (item.label || getToolLabel(tools, item)) {
        has = true;
      }
    });
  }

  return has;
};

export const hasFormats = (
  formats: Array<IFormat>,
  items: Array<IFormat> | null,
): boolean => {
  let has = false;

  if (items) {
    items.forEach((item) => {
      if (item.label || getFormatLabel(formats, item)) {
        has = true;
      }
    });
  }

  return has;
};

export const hasLevels = (
  levels: Array<ILevel>,
  items: Array<ELevel> | null,
): boolean => {
  let has = false;

  if (items) {
    items.forEach((item) => {
      if (getLevelLabel(levels, item)) {
        has = true;
      }
    });
  }

  return has;
};
