<template>
  <footer class="footer">
    <div class="content">
      <div class="footer__sides">
        <div class="footer__side footer__side--left">
          <div class="footer__logo">
            <Logo light />
          </div>
          <div class="footer__info">
            <p>Сравниваем онлайн-курсы по digital и IT.</p>
            <p>
              Мы — каталог-отзовик курсов. Выбирайте курсы по отзывам,
              цене, продолжительности и другим критериям!
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

import Logo from '@/components/atoms/Logo.vue';
import MenuBottom from '@/components/atoms/MenuBottom.vue';
import IMenu from '@/interfaces/menu';

const menuSchools = ref<IMenu[]>([
  {
    label: 'Skillbox',
    link: '/school/skillbox',
  },
  {
    label: 'Нетология',
    link: '/school/netology',
  },
  {
    label: 'GeekBrains',
    link: '/school/geek-brains',
  },
]);

const menuDirections = ref<IMenu[]>([
  {
    label: 'Программирование',
    link: '/directions/programmirovanie',
  },
  {
    label: 'Маркетинг',
    link: '/directions/marketing',
  },
  {
    label: 'Дизайн',
    link: '/directions/dizayn',
  },
  {
    label: 'Бизнес и управление',
    link: '/directions/biznes-i-upravlenie',
  },
  {
    label: 'Аналитика',
    link: '/directions/analitika',
  },
  {
    label: 'Игры',
    link: '/directions/igri',
  },
  {
    label: 'Другие профессии',
    link: '/directions/drugie-professii',
  },
]);

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
