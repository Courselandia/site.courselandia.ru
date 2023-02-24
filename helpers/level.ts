import ELevel from '@/enums/components/molecules/level';

const level = (value: ELevel): string | null => {
  if (value === ELevel.JUNIOR) {
    return 'Для начинающих';
  }

  if (value === ELevel.MIDDLE) {
    return 'Для продвинутых';
  }

  if (value === ELevel.SENIOR) {
    return 'Для профессионалов';
  }

  return null;
};

export default level;
