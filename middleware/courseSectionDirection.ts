import { storeToRefs } from 'pinia';

import { apiLinkDirection } from '@/api/direction';
import category from '@/stores/category';
import profession from '@/stores/profession';
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
    const result = await apiLinkDirection(link as string);

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
    const { itemLinkProfession } = storeToRefs(profession());
    const { itemLinkSchool } = storeToRefs(school());
    const { itemLinkSkill } = storeToRefs(skill());
    const { itemLinkTeacher } = storeToRefs(teacher());
    const { itemLinkTool } = storeToRefs(tool());
    const { itemLinkSection } = storeToRefs(section());

    itemLinkCategory.value = null;
    itemLinkProfession.value = null;
    itemLinkSchool.value = null;
    itemLinkSkill.value = null;
    itemLinkTeacher.value = null;
    itemLinkTool.value = null;
    itemLinkSection.value = null;

    return !!result;
  } catch (error: any) {
    console.dir(error);
    return false;
  }
});
