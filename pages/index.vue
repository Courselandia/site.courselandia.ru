<template>
  <div>
    <div class="content">
      <Hero class="mt-12 mb-24 mb-12-sm">
        <template #title>
          С нами найдешь курс быстрее
        </template>
        <template #description>
          Находи онлайн-курсы быстрее, используя умный поиск.
        </template>
        <template #tags>
          <Tags
            v-if="listDirections"
          >
            <Tag
              v-for="(item, key) in listDirections"
              :key="key"
              :to="item.path"
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
              alt="С нами найдешь курс быстрее"
              :width="619"
              :height="641"
            />
          </template>
          <template v-else-if="heroImage === 2">
            <img
              src="@/assets/images/hero/2.webp"
              alt="С нами найдешь курс быстрее"
              :width="621"
              :height="641"
            />
          </template>
          <template v-else>
            <img
              src="@/assets/images/hero/3.webp"
              alt="С нами найдешь курс быстрее"
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
      <Directions
        v-if="listDirections"
        class="mb-40 mb-12-sm"
      >
        <template
          v-for="(item, key) in listDirections"
          :key="key"
        >
          <Direction
            :image="item.image?.default"
            :amount="item.amount"
            :label="item.label"
            :link="item.path"
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
          v-if="courses"
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
import { NuxtMultiCacheRouteCacheHelper } from 'nuxt-multi-cache/dist/runtime/helpers/RouteCacheHelper';
import { storeToRefs } from 'pinia';
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
import direction from '@/stores/direction';

useRouteCache((helper: NuxtMultiCacheRouteCacheHelper) => {
  helper.setMaxAge(3600 * 24).setCacheable().addTags(['index']);
});

const { directions } = storeToRefs(direction());
const listDirections = ref<IMenu[]>();
const heroImage = ref(Math.round(Math.random() * (3 - 1) + 1));

try {
  listDirections.value = await directionsToMenu(directions.value);
} catch (error: any) {
  console.error(error.message);
}

const courses = ref<ICourse[]>();

try {
  courses.value = coursesStoreToCoursesComponent(
    await $fetch('/api/course/readRated'),
  );
} catch (error: any) {
  console.error(error.message);
}

definePageMeta({
  middleware: [
    'preload-directions',
    'preload-schools',
  ],
});
</script>

<style lang="scss">
@import "@/assets/scss/pages/index.scss";
</style>
