<template>
  <div>
    <div class="content">
      <Hero class="mt-12 mb-24 mb-12-sm">
        <template #title>
          С нами находить курсы легче
        </template>
        <template #description>
          Находи онлайн курсы легче используя умный поиск.
        </template>
        <template #tags>
          <Tags>
            <Tag
              v-for="(item, key) in listDirections"
              :key="key"
              :to="item.link"
              border="grey2"
              bck-hover="blue1"
            >
              {{ item.label }}
            </Tag>
          </Tags>
        </template>
        <template #actions>
          <Button
            to="/courses"
            icon
            link="nuxt-link"
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
          <template v-if="heroImage === 1">
            <img
              src="@/assets/images/hero/1.webp"
              alt="С нами находить курсы легче"
              :width="619"
              :height="641"
            />
          </template>
          <template v-else-if="heroImage === 2">
            <img
              src="@/assets/images/hero/2.webp"
              alt="С нами находить курсы легче"
              :width="621"
              :height="641"
            />
          </template>
          <template v-else>
            <img
              src="@/assets/images/hero/3.webp"
              alt="С нами находить курсы легче"
              :width="622"
              :height="641"
            />
          </template>
        </template>
      </Hero>

      <Brands class="mb-40 mb-12-sm" />

      <h2 class="title title--big title--center-mobil">
        Популярные направления
      </h2>
      <Directions class="mb-40 mb-12-sm">
        <template
          v-for="(item, key) in listDirections"
          :key="key"
        >
          <Direction
            :image="item.image?.default"
            :amount="item.amount"
            :label="item.label"
            :link="item.link"
          />
        </template>
      </Directions>
    </div>

    <div class="bck--blue-1 pt-40 pb-40 pt-12-sm pb-12-sm">
      <div class="content">
        <h2 class="title title--big title--center-mobil">
          Лучшие курсы
        </h2>

        <Courses
          :courses="courses"
          class="mb-8"
        />
        <div class="align--center">
          <Button
            to="/courses"
            link="nuxt-link"
          >
            Весь каталог
          </Button>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="pt-24 pb-40 pt-12-sm pb-12-sm">
        <AboutUs />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
} from 'vue';

import AboutUs from '@/components/atoms/AboutUs.vue';
import Button from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';
import Tag from '@/components/atoms/Tag.vue';
import Courses from '@/components/molecules/Courses.vue';
import Direction from '@/components/molecules/Direction.vue';
import Directions from '@/components/molecules/Directions.vue';
import Hero from '@/components/molecules/Hero.vue';
import Tags from '@/components/molecules/Tags.vue';
import Brands from '@/components/organism/Brands.vue';
import { coursesStoreToCoursesComponent } from '@/converts/coursesStoreToCoursesComponent';
import directionsToMenu from '@/converts/directionsToMenu';
import ICourse from '@/interfaces/components/molecules/course';
import IMenu from '@/interfaces/menu';

useHead({
  title: 'Агрегатор онлайн-курсов Courselandia',
  meta: [
    {
      name: 'description',
      content: 'Courselandia — это огромный каталог онлайн курсов по разным направлениям с умным поиском по навыкам, направлениям, профессиям и инструментам. Найдите свой курс быстро и легко.',
    },
  ],
});

const config = useRuntimeConfig();
const listDirections = ref<IMenu[]>();
const heroImage = ref(Math.round(Math.random() * (3 - 1) + 1));

try {
  listDirections.value = await directionsToMenu(await $fetch('/api/direction/read'));
} catch (error: any) {
  console.error(error.message);
}

const courses = ref<ICourse[]>();

try {
  courses.value = coursesStoreToCoursesComponent(await $fetch('/api/course/readRated'));
} catch (error: any) {
  console.error(error.message);
}
</script>

<style lang="scss">
@import "@/assets/scss/pages/index.scss";
</style>
