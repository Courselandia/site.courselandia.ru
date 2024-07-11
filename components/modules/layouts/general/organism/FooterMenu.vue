<template>
  <div class="footer-menu">
    <div class="footer-menu__item">
      <div class="footer-menu__section">
        Школы
      </div>
      <MenuBottom
        v-if="menuSchools"
        :items="menuSchools"
        :limit="limitSchools"
      >
        <template #more>
          Все школы
        </template>
      </MenuBottom>
    </div>
    <div class="footer-menu__item">
      <div class="footer-menu__section">
        Направления
      </div>
      <MenuBottom
        v-if="menuDirections"
        :items="menuDirections"
      />
    </div>
    <div class="footer-menu__item">
      <div class="footer-menu__section">
        Информация
      </div>
      <MenuBottom :items="menuInfo" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import MenuBottom from '@/components/modules/layouts/general/atoms/MenuBottom.vue';
import directionsToMenu from '@/converts/directionsToMenu';
import schoolsToMenu from '@/converts/schoolsToMenu';
import type IMenu from '@/interfaces/menu';
import type ISchool from '@/interfaces/stores/school/school';
import direction from '@/stores/direction';
import school from '@/stores/school';

const { schools } = storeToRefs(school());
schools.value = schools.value?.sort((first: ISchool, second: ISchool) => {
  if (first.amount_courses?.all < second.amount_courses?.all) {
    return 1;
  }

  if (first.amount_courses?.all > second.amount_courses?.all) {
    return -1;
  }

  return 0;
}) || null;

const limitSchools = ref<number>(7);
const menuSchools = schoolsToMenu(schools.value);

const { directions } = storeToRefs(direction());
const menuDirections = ref<IMenu[]>();

try {
  menuDirections.value = await directionsToMenu(directions.value);
} catch (error: any) {
  console.error(error.message);
}

const menuInfo = ref<IMenu[]>([
  /*
  {
    label: 'Контактная информация',
    path: '/contact-info',
  },
  */
  {
    label: 'Блог',
    path: '/blog',
  },
  {
    label: 'Пользовательское соглашение',
    path: '/agreement',
  },
  {
    label: 'Политика конфиденциальности',
    path: '/privacy-policy',
  },
]);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/layouts/general/organism/footerMenu";
</style>
