import { storeToRefs } from 'pinia';

import { apiLinkSection } from '@/api/section';
import category from '@/stores/category';
import direction from '@/stores/direction';
import profession from '@/stores/profession';
import school from '@/stores/school';
import skill from '@/stores/skill';
import teacher from '@/stores/teacher';
import tool from '@/stores/tool';
import type TLink from '@/types/link';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const {
    sectionType1,
    link,
    sectionType2,
    sectionLink2,
    level,
    free,
  } = to.params;

  try {
    const result = await apiLinkSection(
      sectionType1 as string,
      link as string,
      sectionType2 as string,
      sectionLink2 as string,
      level as TLink,
      free === 'free',
    );

    const title = result?.metatag?.title || '';
    const description = result?.metatag?.description || '';

    useHead({
      title,
      meta: [
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: description,
        },
      ],
    });

    const { itemLinkCategory } = storeToRefs(category());
    const { itemLinkDirection } = storeToRefs(direction());
    const { itemLinkProfession } = storeToRefs(profession());
    const { itemLinkSchool } = storeToRefs(school());
    const { itemLinkSkill } = storeToRefs(skill());
    const { itemLinkTeacher } = storeToRefs(teacher());
    const { itemLinkTool } = storeToRefs(tool());

    itemLinkCategory.value = null;
    itemLinkDirection.value = null;
    itemLinkProfession.value = null;
    itemLinkSchool.value = null;
    itemLinkSkill.value = null;
    itemLinkTeacher.value = null;
    itemLinkTool.value = null;

    return !!result;
  } catch (error: any) {
    return false;
  }
});
