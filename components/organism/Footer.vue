<template>
  <div class="footer">
    <footer class="content">
      <div class="footer__sides">
        <div class="footer__side footer__side--left">
          <div class="footer__logo">
            <Logo light />
          </div>
          <div class="footer__info">
            <p>Ищем и сравниваем курсы IT сферы.</p>
            <p>
              Мы — каталог курсов IT сферы.
              Ищите и сравнивайте курсы по различным параметрам:
              цена, продолжительность и другие критерии.
            </p>
            <p>{{ currentYear !== foundYear ? `${foundYear}–${currentYear}` : foundYear }} Courselandia ©</p>
          </div>
        </div>
        <div class="footer__side footer__side--right">
          <div class="footer__menus">
            <div class="footer__menu">
              <div class="footer__section">
                Школы
              </div>
              <MenuBottom
                v-if="menuSchools"
                :items="menuSchools"
              />
            </div>
            <div class="footer__menu">
              <div class="footer__section">
                Направления
              </div>
              <MenuBottom
                v-if="menuDirections"
                :items="menuDirections"
              />
            </div>
            <div class="footer__menu">
              <div class="footer__section">
                Информация
              </div>
              <MenuBottom :items="menuInfo" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import {
  ref,
} from 'vue';

import Logo from '@/components/atoms/Logo.vue';
import MenuBottom from '@/components/atoms/MenuBottom.vue';
import directionsToMenu from '@/converts/directionsToMenu';
import schoolsToMenu from '@/converts/schoolsToMenu';
import type IMenu from '@/interfaces/menu';
import direction from '@/stores/direction';
import school from '@/stores/school';

const currentYear = ref(new Date().getFullYear());
const foundYear = 2023;

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
@import "@/assets/scss/components/organism/footer.scss";
</style>
