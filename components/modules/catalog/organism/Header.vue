<template>
  <div class="header">
    <Header>
      <template #title>
        Курсы онлайн от Courselandia
      </template>
      <template #description>
        <Reducer>
          <p>
            IT курсы с нуля давно доказали свою эффективность.
            Хорошо зная рынок услуг онлайн-образования в нашей стране,
            проводя его систематический мониторинг и изучение, мы подобрали
            для вас перечень IT курсов онлайн, которые обеспечивают учащимся
            наилучший результат. Многие люди уже успешно прошли их и в
            настоящее время стали успешными специалистами с отличными
            перспективами карьерного роста.
          </p>
          <p>
            <nuxt-link to="/courses/direction/programmirovanie" class="link">
              Все онлайн-курсы</nuxt-link> рассортированы по категориям.
            Это позволяет быстро найти нужное направление обучения. Подбор
            курсов можно осуществить по профессии, например, курсы бизнес
            аналитика или
            <nuxt-link to="/courses/profession/fullstackdizayner" class="link">
              Fullstack дизайнер</nuxt-link>, стоимости обучения,
            уровню, рейтингу и т. д.
          </p>
        </Reducer>
      </template>
      <template #section>
        <div class="header__fire" />
        <div class="header__label">
          Сейчас в тренде
        </div>
      </template>
      <template #tags>
      </template>
    </Header>
  </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line import/no-extraneous-dependencies
import 'vue3-carousel/dist/carousel.css';

import { storeToRefs } from 'pinia';
import {
  ref,
} from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Carousel,
  Pagination,
  Slide,
} from 'vue3-carousel';

import Button from '@/components/atoms/Button.vue';
import Reducer from '@/components/atoms/Reducer.vue';
import Tag from '@/components/atoms/Tag.vue';
import Header from '@/components/modules/catalog/molecules/Header.vue';
import HeaderTeacher from '@/components/modules/catalog/molecules/HeaderTeacher.vue';
import Tags from '@/components/molecules/Tags.vue';
import type ITag from '@/interfaces/components/atoms/tag';
import type ICategoryLink from '@/interfaces/stores/course/categoryLink';
import category from '@/stores/category';
import direction from '@/stores/direction';
import profession from '@/stores/profession';
import school from '@/stores/school';
import section from '@/stores/section';
import skill from '@/stores/skill';
import teacher from '@/stores/teacher';
import tool from '@/stores/tool';

const { itemLinkCategory } = storeToRefs(category());
const { itemLinkDirection } = storeToRefs(direction());
const { itemLinkProfession } = storeToRefs(profession());
const { itemLinkSchool } = storeToRefs(school());
const { itemLinkSkill } = storeToRefs(skill());
const { itemLinkTeacher } = storeToRefs(teacher());
const { itemLinkTool } = storeToRefs(tool());
const { itemLinkSection } = storeToRefs(section());

const getHandfulTags = (
  items: Array<ICategoryLink | ITag>,
  totalInHandful: number,
): Array<Array<ICategoryLink | ITag>> => {
  const result: Array<Array<ICategoryLink | ITag>> = [];

  for (let i = 0; i < items.length; i++) {
    const indexCurrent = Math.floor(i / totalInHandful);

    if (!result[indexCurrent]) {
      result[indexCurrent] = [];
    }

    result[indexCurrent][result[indexCurrent].length] = items[i];
  }

  return result;
};

const popularTags = ref<Array<ITag>>([
  {
    name: 'Нейронные сети',
    link: '/courses/skill/razrabotka-neyrosetey',
  },
  {
    name: 'Программирование',
    link: '/courses/direction/programmirovanie',
  },
  {
    name: 'Разработка мобильных приложений',
    link: '/courses/category/razrabotka-mobilnih-prilozheniy',
  },
  {
    name: 'GeekBrains',
    link: '/courses/school/geekbrains',
  },
  {
    name: 'Java',
    link: '/courses/tool/java',
  },
  {
    name: 'Нетология',
    link: '/courses/school/netologiya',
  },
  {
    name: 'Data Engineering',
    link: '/courses/category/data-engineering',
  },
  {
    name: 'Дизайн',
    link: '/courses/direction/dizayn',
  },
  {
    name: 'Игры',
    link: '/courses/direction/igri',
  },
  {
    name: 'Skillbox',
    link: '/courses/school/skillbox',
  },
  {
    name: 'PHP',
    link: '/courses/tool/php',
  },
  {
    name: 'XYZ School',
    link: '/courses/school/xyz-school',
  },
  {
    name: 'Интернет-маркетинг',
    link: '/courses/category/internetmarketing',
  },
  {
    name: 'Frontend-разработка',
    link: '/courses/category/frontendrazrabotka',
  },
  {
    name: 'Аналитика',
    link: '/courses/direction/analitika',
  },
  {
    name: 'Бизнес и управление',
    link: '/courses/category/data-science',
  },
  {
    name: 'Python',
    link: '/courses/tool/python',
  },
  {
    name: 'Веб-разработка',
    link: '/courses/category/vebrazrabotka',
  },
  {
    name: 'UX/UI-дизайнер',
    link: '/courses/profession/uxuidizayner',
  },
  {
    name: 'Project-менеджер',
    link: '/courses/profession/projectmenedzher',
  },
  {
    name: 'Тестирование ПО',
    link: '/courses/category/testirovanie-po',
  },
]);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/organism/header";
</style>

<style lang="scss" scoped>
@import "@/assets/scss/components/molecules/carousel";
</style>
