<template>
  <div class="content mt-12 mb-24 mb-12-sm">
    <h1 class="title title--1">
      Избранное
    </h1>
    <Courses
      :courses="courses"
      :columns="4"
    >
      <template #empty>
        В избранном пока нет курсов. Но вы всегда можете их добавить ;).
      </template>
    </Courses>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import {
  ref,
} from 'vue';

import { apiReadFavoritesCourses } from '@/api/course';
import Courses from '@/components/molecules/Courses.vue';
import { coursesStoreToCoursesComponent } from '@/converts/coursesStoreToCoursesComponent';
import ICourse from '@/interfaces/components/molecules/course';
import favorite from '@/stores/favorite';

useHead({
  title: 'Список Избранного',
  meta: [
    {
      name: 'description',
      content: 'Список избранных онлайн курсов разных направлений от программирования до маркетинга. Найди свой онлйн курс и прокачайся.',
    },
  ],
});

const config = useRuntimeConfig();

const {
  favorites,
} = storeToRefs(favorite());

const courses = ref<Array<ICourse>>([]);

try {
  courses.value = coursesStoreToCoursesComponent(
    await apiReadFavoritesCourses(config.public.apiUrl, favorites.value),
  );
} catch (error: any) {
  console.error(error.message);
}
</script>
