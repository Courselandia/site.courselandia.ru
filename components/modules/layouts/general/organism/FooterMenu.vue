<template>
  <div class="footer-menu">
    <div class="footer-menu__item">
      <div class="footer-menu__section">
        Школы
      </div>
      <MenuBottom
        v-if="menuSchools"
        :items="menuSchools"
      />
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
import direction from '@/stores/direction';
import school from '@/stores/school';

const { schools } = storeToRefs(school());
const menuSchools = ref<IMenu[]>(schoolsToMenu(schools.value));

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
