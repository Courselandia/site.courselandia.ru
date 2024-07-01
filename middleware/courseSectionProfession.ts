import { storeToRefs } from 'pinia';

import { apiLinkProfession } from '@/api/profession';
import category from '@/stores/category';
import direction from '@/stores/direction';
import school from '@/stores/school';
import section from '@/stores/section';
import skill from '@/stores/skill';
import teacher from '@/stores/teacher';
import tool from '@/stores/tool';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const {
    link,
  } = to.params;

  try {
    const result = await apiLinkProfession(link as string);

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
    const { itemLinkSchool } = storeToRefs(school());
    const { itemLinkSkill } = storeToRefs(skill());
    const { itemLinkTeacher } = storeToRefs(teacher());
    const { itemLinkTool } = storeToRefs(tool());
    const { itemLinkSection } = storeToRefs(section());

    itemLinkCategory.value = null;
    itemLinkDirection.value = null;
    itemLinkSchool.value = null;
    itemLinkSkill.value = null;
    itemLinkTeacher.value = null;
    itemLinkTool.value = null;
    itemLinkSection.value = null;

    return !!result;
  } catch (error: any) {
    return false;
  }
});
