import ELevel from '@/enums/components/modules/catalog/level';
import type ICategory from '@/interfaces/components/modules/catalog/category';
import type IDirection from '@/interfaces/components/modules/catalog/direction';
import type IFormat from '@/interfaces/components/modules/catalog/format';
import type ILevel from '@/interfaces/components/modules/catalog/level';
import type ISchool from '@/interfaces/components/modules/catalog/schoolFilter';
import type ISkill from '@/interfaces/components/modules/catalog/skill';
import type ITeacher from '@/interfaces/components/modules/catalog/teacher';
import type IProfession from '@/interfaces/components/modules/profession';
import type IRating from '@/interfaces/components/modules/rating';
import type TId from '@/types/id';
import type ITool from '@/interfaces/components/modules/catalog/tool';

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

export const countCategories = (
  categories: Array<ICategory>,
  items: Array<ICategory> | null,
): number => {
  let count = 0;

  if (items) {
    items.forEach((item) => {
      if (item.label || getCategoryLabel(categories, item)) {
        count++;
      }
    });
  }

  return count;
};

export const hasRating = (
  ratings: Array<IRating>,
  item: TId | null,
): boolean => (item ? !!getRatingLabel(ratings, item) : false);

export const hasDirection = (
  directions: Array<IDirection>,
  item: IDirection | null,
): boolean => (item ? !!getDirectionLabel(directions, item) : false);

export const countSchools = (
  schools: Array<ISchool>,
  items: Array<ISchool> | null,
): number => {
  let count = 0;

  if (items) {
    items.forEach((item) => {
      if (item.label || getSchoolLabel(schools, item)) {
        count++;
      }
    });
  }

  return count;
};

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

export const countProfessions = (
  professions: Array<IProfession>,
  items: Array<IProfession> | null,
): number => {
  let count = 0;

  if (items) {
    items.forEach((item) => {
      if (item.label || getProfessionLabel(professions, item)) {
        count++;
      }
    });
  }

  return count;
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

export const countSkills = (
  skills: Array<ISkill>,
  items: Array<ISkill> | null,
): number => {
  let count = 0;

  if (items) {
    items.forEach((item) => {
      if (item.label || getSkillLabel(skills, item)) {
        count++;
      }
    });
  }

  return count;
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

export const countTeachers = (
  teachers: Array<ITeacher>,
  items: Array<ITeacher> | null,
): number => {
  let count = 0;

  if (items) {
    items.forEach((item) => {
      if (item.label || getTeacherLabel(teachers, item)) {
        count++;
      }
    });
  }

  return count;
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

export const countTools = (
  tools: Array<ITool>,
  items: Array<ITool> | null,
): number => {
  let count = 0;

  if (items) {
    items.forEach((item) => {
      if (item.label || getToolLabel(tools, item)) {
        count++;
      }
    });
  }

  return count;
};

export const hasFormat = (
  formats: Array<IFormat>,
  item: IFormat | null,
): boolean => (item ? !!getFormatLabel(formats, item) : false);

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

export const countLevels = (
  levels: Array<ILevel>,
  items: Array<ELevel> | null,
): number => {
  let count = 0;

  if (items) {
    items.forEach((item) => {
      if (getLevelLabel(levels, item)) {
        count++;
      }
    });
  }

  return count;
};
