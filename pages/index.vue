<template>
  <div>
    <div class="content">
      <Hero class="mt-15 mb-30 mb-15-sm">
        <template #title>
          С нами находить курсы легче
        </template>
        <template #description>
          Интересные подборки, отзывы и рейтинги в одном месте
        </template>
        <template #tags>
          <Tags>
            <Tag
              to="/courses/programmer"
              border="grey2"
              bck-hover="blue1"
            >
              Программирование
            </Tag>
            <Tag
              to="/courses/marketing"
              border="grey2"
              bck-hover="blue1"
            >
              Маркетинг
            </Tag>
            <Tag
              to="/courses/marketing"
              border="grey2"
              bck-hover="blue1"
            >
              Дизайн
            </Tag>
            <Tag
              to="/courses/marketing"
              border="grey2"
              bck-hover="blue1"
            >
              Бизнес и управление
            </Tag>
            <Tag
              to="/courses/marketing"
              border="grey2"
              bck-hover="blue1"
            >
              Аналитика
            </Tag>
            <Tag
              to="/courses/marketing"
              border="grey2"
              bck-hover="blue1"
            >
              Игры
            </Tag>
          </Tags>
        </template>
        <template #actions>
          <Button
            to="/courses"
            icon
          >
            Каталог курсов
            <template #icon>
              <Icon
                name="link-to"
                color="white"
                :size="[13, 13]"
              />
            </template>
          </Button>
        </template>
        <template #media>
          <img src="@/assets/images/hero/1.webp" alt="С нами находить курсы легче" />
        </template>
      </Hero>

      <Brands class="mb-50 mb-15-sm" />

      <h1 class="title title--big title--center-mobil">
        Популярные направления
      </h1>
      <Directions class="mb-50 mb-15-sm">
        <template
          v-for="(item, key) in directions"
          :key="key"
        >
          <Direction
            :image="item.image.default"
            :amount="item.amount"
            :label="item.label"
            :link="item.link"
          />
        </template>
      </Directions>
    </div>

    <div class="bck--blue-1 pt-50 pb-50 pt-15-sm pb-15-sm">
      <div class="content">
        <h1 class="title title--big title--center-mobil">
          Лучшие курсы
        </h1>

        <Courses
          :courses="courses"
          class="mb-10"
        />
        <div class="align--center">
          <Button>
            Весь каталог
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
} from 'vue';

import Button from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';
import Tag from '@/components/atoms/Tag.vue';
import Courses from '@/components/molecules/Courses.vue';
import Direction from '@/components/molecules/Direction.vue';
import Directions from '@/components/molecules/Directions.vue';
import Hero from '@/components/molecules/Hero.vue';
import Tags from '@/components/molecules/Tags.vue';
import Brands from '@/components/organism/Brands.vue';
import directionsToMenu from '@/converts/directionsToMenu';
import ECurrency from '@/enums/components/molecules/currency';
import EDuration from '@/enums/components/molecules/duration';
import ICourse from '@/interfaces/components/molecules/course';
import IMenu from '@/interfaces/menu';
import { IResponseItems } from '@/interfaces/response';
import IDirection from '@/interfaces/stores/course/direction';
import course from '@/stores/course';
import school from '@/stores/school';

const config = useRuntimeConfig();

const {
  readDirections,
} = course();

const {
  readSchools,
} = school();

const directions = ref<IMenu[]>();

const loadDirections = async ():
  Promise<IResponseItems<IDirection>> => readDirections(config.public.apiUrl, true, true);

try {
  const resultDirections = await useAsyncData('directionsWithCategoriesAndCount', async () => loadDirections());
  const result = resultDirections.data.value?.data;
  directions.value = await directionsToMenu(result, true);
} catch (error: any) {
  console.error(error.message);
}

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
@import "@/assets/scss/pages/index.scss";
</style>
