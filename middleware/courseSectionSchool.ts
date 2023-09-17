import { storeToRefs } from 'pinia';

import { apiLinkSchool } from '@/api/school';
import category from '@/stores/category';
import direction from '@/stores/direction';
import profession from '@/stores/profession';
import school from '@/stores/school';
import skill from '@/stores/skill';
import teacher from '@/stores/teacher';
import tool from '@/stores/tool';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const {
    link,
  } = to.params;

  const config = useRuntimeConfig();

  try {
    const result = await apiLinkSchool(
      config.public.apiUrl,
      config.public.development,
      link as string,
    );

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
    itemLinkSchool.value = result;
    itemLinkSkill.value = null;
    itemLinkTeacher.value = null;
    itemLinkTool.value = null;

    return !!result;
  } catch (error: any) {
    return false;
  }
});
