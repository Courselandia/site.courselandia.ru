<template>
  <div>
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
        <div class="catalog-header__fire" />
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
            <CatalogFilters
              v-model:selected-direction="selectedDirection"
              v-model:selected-rating="selectedRating"
              v-model:selected-schools="selectedSchools"
              v-model:selected-categories="selectedCategories"
              v-model:selected-professions="selectedProfessions"
              v-model:selected-teachers="selectedTeachers"
              v-model:selected-skills="selectedSkills"
              v-model:selected-tools="selectedTools"
              v-model:selected-format="selectedFormat"
              v-model:selected-levels="selectedLevels"
              v-model:selected-prices="selectedPrices"
              v-model:selected-durations="selectedDurations"
              v-model:selected-loan="selectedLoan"
              v-model:selected-free="selectedFree"
              :price-min="priceMin"
              :price-max="priceMax"
              :price-step="priceStep"
              :duration-min="durationMin"
              :duration-max="durationMax"
              :duration-step="durationStep"
              :directions="directions"
              :ratings="ratings"
              :schools="schools"
              :categories="categories"
              :professions="professions"
              :teachers="teachers"
              :skills="skills"
              :tools="tools"
              :formats="formats"
              :levels="levels"
              @load-items="onLoadItems"
            />
          </div>
          <div class="catalog__items">
            <div class="catalog__tools">
              <CatalogTools
                v-model:sort="sort"
                v-model:type="type"
              />
            </div>
            <div class="catalog__tags">
              <CatalogTags
                v-model:selected-direction="selectedDirection"
                v-model:selected-rating="selectedRating"
                v-model:selected-schools="selectedSchools"
                v-model:selected-categories="selectedCategories"
                v-model:selected-professions="selectedProfessions"
                v-model:selected-teachers="selectedTeachers"
                v-model:selected-skills="selectedSkills"
                v-model:selected-tools="selectedTools"
                v-model:selected-format="selectedFormat"
                v-model:selected-levels="selectedLevels"
                v-model:selected-prices="selectedPrices"
                v-model:selected-durations="selectedDurations"
                v-model:selected-loan="selectedLoan"
                v-model:selected-free="selectedFree"
                :price-min="priceMin"
                :price-max="priceMax"
                :duration-min="durationMin"
                :duration-max="durationMax"
                :directions="directions"
                :ratings="ratings"
                :schools="schools"
                :categories="categories"
                :professions="professions"
                :teachers="teachers"
                :skills="skills"
                :tools="tools"
                :formats="formats"
                :levels="levels"
              />
            </div>
            <div class="catalog__courses">
              <Courses
                :courses="courses"
                :columns="3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import Button from '@/components/atoms/Button.vue';
import Tag from '@/components/atoms/Tag.vue';
import CatalogFilters from '@/components/molecules/CatalogFilters.vue';
import CatalogHeader from '@/components/molecules/CatalogHeader.vue';
import CatalogTags from '@/components/molecules/CatalogTags.vue';
import CatalogTools from '@/components/molecules/CatalogTools.vue';
import Courses from '@/components/molecules/Courses.vue';
import Tags from '@/components/molecules/Tags.vue';
import ECourseSort from '@/enums/components/molecules/courseSort';
import ECourseType from '@/enums/components/molecules/courseType';
import ECurrency from '@/enums/components/molecules/currency';
import EDuration from '@/enums/components/molecules/duration';
import ELevel from '@/enums/components/molecules/level';
import ICategory from '@/interfaces/components/molecules/category';
import ICourse from '@/interfaces/components/molecules/course';
import IDirection from '@/interfaces/components/molecules/direction';
import IFormat from '@/interfaces/components/molecules/format';
import ILevel from '@/interfaces/components/molecules/level';
import IProfession from '@/interfaces/components/molecules/profession';
import IRating from '@/interfaces/components/molecules/rating';
import ISchool from '@/interfaces/components/molecules/schoolFilter';
import ISkill from '@/interfaces/components/molecules/skill';
import ITeacher from '@/interfaces/components/molecules/teacher';
import ITool from '@/interfaces/components/molecules/tool';
import TValue from '@/types/value';

const route = useRoute();
const sort = ref<TValue>(route.query.sort as TValue || ECourseSort.DATE);
const type = ref<TValue>(ECourseType.TILE);

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

const onLoadItems = (name: string): void => {
  console.log(`Loading ${name}...`);
};

//

const selectedLoan = ref(false);
const selectedFree = ref(false);

//

const priceMin = ref(0);
const priceMax = ref(350000);
const priceStep = ref(1000);
const selectedPrices = ref<Array<number>>([priceMin.value, priceMax.value]);

//

const durationMin = ref(0);
const durationMax = ref(62);
const durationStep = ref(1);
const selectedDurations = ref<Array<number>>([durationMin.value, durationMax.value]);

//

const directions = ref<IDirection[]>([
  {
    id: 1,
    name: 'Программирование',
    link: 'programming',
  },
  {
    id: 2,
    name: 'Маркетинг',
    link: 'marketing',
  },
  {
    id: 3,
    name: 'Дизайн',
    link: 'design',
  },
  {
    id: 4,
    name: 'Бизнес управление',
    link: 'business',
  },
  {
    id: 5,
    name: 'Аналитика',
    link: 'analitics',
  },
  {
    id: 6,
    name: 'Игры',
    link: 'games',
  },
  {
    id: 7,
    name: 'Другие профессии',
    link: 'other',
  },
]);
const selectedDirection = ref<IDirection | null>();
const schools = ref<ISchool[]>([
  {
    id: 1,
    label: 'Нетология',
    link: 'netology',
  },
  {
    id: 2,
    label: 'GeekBrains',
    link: 'GeekBrains',
  },
  {
    id: 3,
    label: 'Skillbox',
    link: 'Skillbox',
  },
  {
    id: 5,
    label: 'XYZ',
    link: 'xyz',
  },
  {
    id: 6,
    label: 'Яндекс Практикум',
    link: 'yandex',
  },
  {
    id: 7,
    label: 'Otus',
    link: 'Otus',
  },
  {
    id: 8,
    label: 'iKit.pro',
    link: 'iKit',
  },
  {
    id: 9,
    label: 'Skillbox',
    link: 'Skillbox',
  },
  {
    id: 10,
    label: 'XYZ',
    link: 'xyz',
  },
  {
    id: 11,
    label: 'Яндекс Практикум',
    link: 'yandex',
  },
  {
    id: 12,
    label: 'Otus',
    link: 'Otus',
  },
  {
    id: 13,
    label: 'iKit.pro',
    link: 'iKit',
  },
]);
const categories = ref<ICategory[]>([
  {
    id: 1,
    label: 'Нетология',
    link: 'netology',
  },
  {
    id: 2,
    label: 'GeekBrains',
    link: 'GeekBrains',
  },
  {
    id: 3,
    label: 'Skillbox',
    link: 'Skillbox',
  },
  {
    id: 5,
    label: 'XYZ',
    link: 'xyz',
  },
  {
    id: 6,
    label: 'Яндекс Практикум',
    link: 'yandex',
  },
  {
    id: 7,
    label: 'Otus',
    link: 'Otus',
  },
  {
    id: 8,
    label: 'iKit.pro',
    link: 'iKit',
  },
  {
    id: 9,
    label: 'Skillbox',
    link: 'Skillbox',
  },
  {
    id: 10,
    label: 'XYZ',
    link: 'xyz',
  },
  {
    id: 11,
    label: 'Яндекс Практикум',
    link: 'yandex',
  },
  {
    id: 12,
    label: 'Otus',
    link: 'Otus',
  },
  {
    id: 13,
    label: 'iKit.pro',
    link: 'iKit',
  },
]);
const professions = ref<IProfession[]>([
  {
    id: 1,
    label: 'Нетология',
    link: 'netology',
  },
  {
    id: 2,
    label: 'GeekBrains',
    link: 'GeekBrains',
  },
  {
    id: 3,
    label: 'Skillbox',
    link: 'Skillbox',
  },
  {
    id: 5,
    label: 'XYZ',
    link: 'xyz',
  },
  {
    id: 6,
    label: 'Яндекс Практикум',
    link: 'yandex',
  },
  {
    id: 7,
    label: 'Otus',
    link: 'Otus',
  },
  {
    id: 8,
    label: 'iKit.pro',
    link: 'iKit',
  },
  {
    id: 9,
    label: 'Skillbox',
    link: 'Skillbox',
  },
  {
    id: 10,
    label: 'XYZ',
    link: 'xyz',
  },
  {
    id: 11,
    label: 'Яндекс Практикум',
    link: 'yandex',
  },
  {
    id: 12,
    label: 'Otus',
    link: 'Otus',
  },
  {
    id: 13,
    label: 'iKit.pro',
    link: 'iKit',
  },
]);
const teachers = ref<ITeacher[]>([
  {
    id: 1,
    label: 'Нетология',
    link: 'netology',
  },
  {
    id: 2,
    label: 'GeekBrains',
    link: 'GeekBrains',
  },
  {
    id: 3,
    label: 'Skillbox',
    link: 'Skillbox',
  },
  {
    id: 5,
    label: 'XYZ',
    link: 'xyz',
  },
  {
    id: 6,
    label: 'Яндекс Практикум',
    link: 'yandex',
  },
  {
    id: 7,
    label: 'Otus',
    link: 'Otus',
  },
  {
    id: 8,
    label: 'iKit.pro',
    link: 'iKit',
  },
  {
    id: 9,
    label: 'Skillbox',
    link: 'Skillbox',
  },
  {
    id: 10,
    label: 'XYZ',
    link: 'xyz',
  },
  {
    id: 11,
    label: 'Яндекс Практикум',
    link: 'yandex',
  },
  {
    id: 12,
    label: 'Otus',
    link: 'Otus',
  },
  {
    id: 13,
    label: 'iKit.pro',
    link: 'iKit',
  },
]);
const skills = ref<ISkill[]>([
  {
    id: 1,
    label: 'Нетология',
    link: 'netology',
  },
  {
    id: 2,
    label: 'GeekBrains',
    link: 'GeekBrains',
  },
  {
    id: 3,
    label: 'Skillbox',
    link: 'Skillbox',
  },
  {
    id: 5,
    label: 'XYZ',
    link: 'xyz',
  },
  {
    id: 6,
    label: 'Яндекс Практикум',
    link: 'yandex',
  },
  {
    id: 7,
    label: 'Otus',
    link: 'Otus',
  },
  {
    id: 8,
    label: 'iKit.pro',
    link: 'iKit',
  },
  {
    id: 9,
    label: 'Skillbox',
    link: 'Skillbox',
  },
  {
    id: 10,
    label: 'XYZ',
    link: 'xyz',
  },
  {
    id: 11,
    label: 'Яндекс Практикум',
    link: 'yandex',
  },
  {
    id: 12,
    label: 'Otus',
    link: 'Otus',
  },
  {
    id: 13,
    label: 'iKit.pro',
    link: 'iKit',
  },
]);
const tools = ref<ITool[]>([
  {
    id: 1,
    label: 'Нетология',
    link: 'netology',
  },
  {
    id: 2,
    label: 'GeekBrains',
    link: 'GeekBrains',
  },
  {
    id: 3,
    label: 'Skillbox',
    link: 'Skillbox',
  },
  {
    id: 5,
    label: 'XYZ',
    link: 'xyz',
  },
  {
    id: 6,
    label: 'Яндекс Практикум',
    link: 'yandex',
  },
  {
    id: 7,
    label: 'Otus',
    link: 'Otus',
  },
  {
    id: 8,
    label: 'iKit.pro',
    link: 'iKit',
  },
  {
    id: 9,
    label: 'Skillbox',
    link: 'Skillbox',
  },
  {
    id: 10,
    label: 'XYZ',
    link: 'xyz',
  },
  {
    id: 11,
    label: 'Яндекс Практикум',
    link: 'yandex',
  },
  {
    id: 12,
    label: 'Otus',
    link: 'Otus',
  },
  {
    id: 13,
    label: 'iKit.pro',
    link: 'iKit',
  },
]);

const selectedFormat = ref<IFormat | null>();
const formats = ref<IFormat[]>([
  {
    label: 'Онлайн',
    value: true,
  },
  {
    label: 'Офлайн',
    value: false,
  },
]);

//

const selectedLevels = ref<Array<ILevel>>([]);
const levels = ref<ILevel[]>([
  {
    label: 'Для начинающих',
    value: ELevel.JUNIOR,
  },
  {
    label: 'Для продвинутых',
    value: ELevel.MIDDLE,
  },
  {
    label: 'Для профессионалов',
    value: ELevel.SENIOR,
  },
]);

//

const ratings = ref<IRating[]>([
  {
    label: '4.5 и выше',
    value: 4.5,
  },
  {
    label: '4.0 и выше',
    value: 4,
  },
  {
    label: '3.5 и выше',
    value: 3.5,
  },
  {
    label: '3.0 и выше',
    value: 3,
  },
]);

const selectedRating = ref<IRating | null>();

const selectedSchools = ref<Array<ISchool>>();

const selectedCategories = ref<Array<ICategory>>();

const selectedProfessions = ref<Array<IProfession>>();

const selectedTeachers = ref<Array<ITeacher>>();

const selectedSkills = ref<Array<ISkill>>();

const selectedTools = ref<Array<ITool>>();
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/catalog.scss";
</style>
