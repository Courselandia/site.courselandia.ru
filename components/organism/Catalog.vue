<template>
  <CatalogHeader>
    <template #title>
      Онлайн курсы по Дизайну
    </template>
    <template #description>
      Пройдя курсы от лучших онлайн-школ, вы научитесь моделировать и
      визуализировать 3D-объекты, создавать дизайн одежды, интерьеров
      или даже проектировать дизайны различных торговых центров,
      скверов и парков, анимировать картинки, разрабатывать UX/UI-дизайн
      и дизайн мобильных приложений, а также многое другое.
    </template>
    <template #section>
      <div class="catalog-header__fire"></div>
      <div class="catalog-header__label">
        Сейчас в тренде
      </div>
    </template>
    <template #tags>
      <Tags>
        <Tag
          to="/courses/programmer"
          bck="white"
          shadow
        >
          Программирование
        </Tag>
        <Tag
          to="/courses/marketing"
          bck="white"
          shadow
        >
          Маркетинг
        </Tag>
        <Tag
          to="/courses/marketing"
          bck="white"
          shadow
        >
          Дизайн
        </Tag>
        <Tag
          to="/courses/marketing"
          bck="white"
          shadow
        >
          Бизнес и управление
        </Tag>
        <Tag
          to="/courses/marketing"
          bck="white"
          shadow
        >
          Аналитика
        </Tag>
        <Tag
          to="/courses/marketing"
          bck="white"
          shadow
        >
          Игры
        </Tag>
      </Tags>
    </template>
  </CatalogHeader>

  <CatalogHeader>
    <template #title>
      Онлайн курсы школы Skillbox
    </template>
    <template #description>
      Skillbox — это одна из крупнейших образовательных платформ на российском рынке.
      Она предоставляет более 500 образовательных курсов по различным тематикам,
      начиная с программирования и аналитики и заканчивая модой и флористикой.
    </template>
    <template #rating>
      4.5
    </template>
    <template #reviews>
      <nuxt-link to="/">
        1236 отзывов
      </nuxt-link>
    </template>
    <template #image>
      <img src="https://loc-api.courselandia.ru/storage/uploaded/images/schools/1.png" alt="" title="" />
    </template>
    <template #teachers>
      2300
    </template>
    <template #action>
      <Button
        to="/"
        link="link"
        target="_blank"
      >
        Перейти на сайт
      </Button>
    </template>
  </CatalogHeader>

  <div class="catalog">
    <div class="content">
      <div class="catalog__content">
        <div class="catalog__filter">
          HERE
          <div>
            52
          </div>
        </div>
        <div class="catalog__items">
          <Courses
            :courses="courses"
            :columns="3"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import Button from '@/components/atoms/Button.vue';
import Tag from '@/components/atoms/Tag.vue';
import CatalogHeader from '@/components/molecules/CatalogHeader.vue';
import Courses from '@/components/molecules/Courses.vue';
import Tags from '@/components/molecules/Tags.vue';
import ECurrency from '@/enums/components/molecules/currency';
import EDuration from '@/enums/components/molecules/duration';
import ICourse from '@/interfaces/components/molecules/course';

const courses = ref<ICourse[]>([
  {
    id: 12,
    name: 'Контекстная реклама с нуля',
    link: 'context',
    url: 'http//:yandex.ru/',
    rating: 5,
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/courses/1.webp',
    price: 90000,
    price_old: 130000,
    price_recurrent_price: 4000,
    currency: ECurrency.RUB,
    duration: 24,
    duration_unit: EDuration.MONTH,
    lessons_amount: 90,
    school: {
      name: 'Нетология',
      image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/4.png',
      link: 'netology',
    },
  },
  {
    id: 14,
    name: 'Разработчик',
    link: 'context',
    url: 'http//:yandex.ru/',
    rating: 4.5,
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/courses/2.webp',
    price: 50000,
    price_old: 160000,
    price_recurrent_price: 6000,
    currency: ECurrency.RUB,
    duration: 12,
    duration_unit: EDuration.MONTH,
    lessons_amount: 70,
    school: {
      name: 'GeekBrains',
      image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/4.png',
      link: 'netology',
    },
  },
  {
    id: 13,
    name: 'Геймификатор',
    link: 'context',
    url: 'http//:yandex.ru/',
    rating: 4.5,
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/courses/3.webp',
    price: 70000,
    price_old: 160000,
    price_recurrent_price: null,
    currency: ECurrency.RUB,
    duration: 12,
    duration_unit: EDuration.MONTH,
    lessons_amount: 70,
    school: {
      name: 'GeekBrains',
      image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/4.png',
      link: 'netology',
    },
  },
  {
    id: 13,
    name: 'Дизайнер упаковки',
    link: 'context',
    url: 'http//:yandex.ru/',
    rating: 3.5,
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/courses/5.webp',
    price: 120000,
    price_old: null,
    price_recurrent_price: null,
    currency: ECurrency.RUB,
    duration: 12,
    duration_unit: EDuration.MONTH,
    lessons_amount: 70,
    school: {
      name: 'GeekBrains',
      image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/4.png',
      link: 'netology',
    },
  },
  {
    id: 18,
    name: 'Продвижение на Wildberries и OZON',
    link: 'context',
    url: 'http//:yandex.ru/',
    rating: 3.5,
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/courses/6.webp',
    price: 120000,
    price_old: null,
    price_recurrent_price: 6000,
    currency: ECurrency.RUB,
    duration: 12,
    duration_unit: EDuration.MONTH,
    lessons_amount: 70,
    school: {
      name: 'GeekBrains',
      image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/4.png',
      link: 'netology',
    },
  },
  {
    id: 12,
    name: 'Контекстная реклама с нуля',
    link: 'context',
    url: 'http//:yandex.ru/',
    rating: 5,
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/courses/1.webp',
    price: 90000,
    price_old: 130000,
    price_recurrent_price: 4000,
    currency: ECurrency.RUB,
    duration: 24,
    duration_unit: EDuration.MONTH,
    lessons_amount: 90,
    school: {
      name: 'Нетология',
      image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/4.png',
      link: 'netology',
    },
  },
  {
    id: 20,
    name: 'Эмоциональный интеллект и лидерство',
    link: 'context',
    url: 'http//:yandex.ru/',
    rating: 5,
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/courses/3.webp',
    price: 50000,
    price_old: null,
    price_recurrent_price: null,
    currency: ECurrency.RUB,
    duration: null,
    duration_unit: null,
    lessons_amount: null,
    school: {
      name: 'Нетология',
      image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/4.png',
      link: 'netology',
    },
  },
  {
    id: 20,
    name: 'Эмоциональный интеллект и лидерство',
    link: 'context',
    url: 'http//:yandex.ru/',
    rating: 5,
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/courses/3.webp',
    price: 50000,
    price_old: null,
    price_recurrent_price: null,
    currency: ECurrency.RUB,
    duration: null,
    duration_unit: null,
    lessons_amount: null,
    school: {
      name: 'Нетология',
      image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/4.png',
      link: 'netology',
    },
  },
]);
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/catalog.scss";
</style>
