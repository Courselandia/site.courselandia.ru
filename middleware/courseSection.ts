import { storeToRefs } from 'pinia';

import category from '@/stores/category';
import direction from '@/stores/direction';
import profession from '@/stores/profession';
import school from '@/stores/school';
import skill from '@/stores/skill';
import teacher from '@/stores/teacher';
import tool from '@/stores/tool';

export default defineNuxtRouteMiddleware((to): boolean => {
  const title = 'Каталог онлайн курсов от Courselandia';
  const description = 'Каталог курсов от ведущих онлайн школ по разным направлениям. Удобный поиск по профессиям, направлениям, инструментам и навыкам. Найди свой курс быстро и легко.';

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

  itemLinkDirection.value = null;
  itemLinkCategory.value = null;
  itemLinkProfession.value = null;
  itemLinkSchool.value = null;
  itemLinkSkill.value = null;
  itemLinkTeacher.value = null;
  itemLinkTool.value = null;

  return true;
});
