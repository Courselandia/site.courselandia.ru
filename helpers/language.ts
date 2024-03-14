import ELanguage from '@/enums/components/modules/catalog/language';

const language = (value: ELanguage): string | null => {
  if (value === ELanguage.RU) {
    return 'Русский';
  }

  if (value === ELanguage.EN) {
    return 'Английский';
  }

  return null;
};

export default language;
