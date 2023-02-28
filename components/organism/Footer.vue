<template>
  <footer class="footer">
    <div class="content">
      <div class="footer__sides">
        <div class="footer__side footer__side--left">
          <div class="footer__logo">
            <Logo light />
          </div>
          <div class="footer__info">
            <p>Ищем и сравниваем курсы IT сферы.</p>
            <p>
              Мы - каталог курсов IT сферы.
              Ищите и сравнивайте курсы по различным параметрам:
              цена, продолжительность и много других критериев.
            </p>
            <p>2023 Courcesalndia ©</p>
          </div>
        </div>
        <div class="footer__side footer__side--right">
          <div class="footer__menus">
            <div class="footer__menu">
              <div class="footer__section">
                Школы
              </div>
              <MenuBottom :items="menuSchools" />
            </div>
            <div class="footer__menu">
              <div class="footer__section">
                Направления
              </div>
              <MenuBottom :items="menuDirections" />
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
    </div>
  </footer>
</template>

<script lang="ts" setup>
import {
  ref,
} from 'vue';

import { apiReadDirections } from '@/api/direction';
import { apiReadSchools } from '@/api/school';
import Logo from '@/components/atoms/Logo.vue';
import MenuBottom from '@/components/atoms/MenuBottom.vue';
import directionsToMenu from '@/converts/directionsToMenu';
import schoolsToMenu from '@/converts/schoolsToMenu';
import IMenu from '@/interfaces/menu';

const config = useRuntimeConfig();

const menuSchools = ref<IMenu[]>();

try {
  menuSchools.value = schoolsToMenu(await apiReadSchools(config.public.apiUrl));
} catch (error: any) {
  console.error(error.message);
}

const menuDirections = ref<IMenu[]>();

try {
  menuDirections.value = await directionsToMenu(await apiReadDirections(config.public.apiUrl));
} catch (error: any) {
  console.error(error.message);
}

const menuInfo = ref<IMenu[]>([
  {
    label: 'Контактная информация',
    link: '/contact-info',
  },
  {
    label: 'Пользовательское соглашение',
    link: '/agreement',
  },
  {
    label: 'Политика конфиденциальности',
    link: '/privacy-policy',
  },
]);

</script>

<style lang="scss">
@import "@/assets/scss/components/organism/footer.scss";
</style>
