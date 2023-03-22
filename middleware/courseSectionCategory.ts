import { storeToRefs } from 'pinia';

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

  const result = await $fetch('/api/category/link', {
    params: {
      link: link as string,
    },
  });

  const { itemLinkCategory } = storeToRefs(category());
  const { itemLinkDirection } = storeToRefs(direction());
  const { itemLinkProfession } = storeToRefs(profession());
  const { itemLinkSchool } = storeToRefs(school());
  const { itemLinkSkill } = storeToRefs(skill());
  const { itemLinkTeacher } = storeToRefs(teacher());
  const { itemLinkTool } = storeToRefs(tool());

  itemLinkCategory.value = result;
  itemLinkDirection.value = null;
  itemLinkProfession.value = null;
  itemLinkSchool.value = null;
  itemLinkSkill.value = null;
  itemLinkTeacher.value = null;
  itemLinkTool.value = null;

  return !!result;
});
