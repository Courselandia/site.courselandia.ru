import ECacheDate from '@/enums/cache';
import type { IResponseItem } from '@/interfaces/response';
import type ISectionLink from '@/interfaces/stores/course/sectionLink';
import section from '@/stores/section';
import type TLink from '@/types/link';

export const apiLinkSection = async (
  sectionType1: string,
  sectionLink1: string,
  sectionType2: string | null = null,
  sectionLink2: string | null = null,
  level: TLink | null = null,
  free: boolean = false,
  cacheDate: ECacheDate = ECacheDate.DAY,
): Promise<ISectionLink | null> => {
  const {
    linkSection,
  } = section();

  const loadSection = async ():
    Promise<IResponseItem<ISectionLink>> => linkSection(
    sectionType1,
    sectionLink1,
    sectionType2,
    sectionLink2,
    level,
    free,
    cacheDate,
  );

  const resultSection = await useAsyncData('section', async () => loadSection());

  return resultSection.data.value?.data || null;
};
