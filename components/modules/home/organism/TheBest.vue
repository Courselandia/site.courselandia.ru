<template>
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
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Button from '@/components/atoms/Button.vue';
import Courses from '@/components/modules/catalog/molecules/Courses.vue';
import { coursesStoreToCoursesComponent } from '@/converts/coursesStoreToCoursesComponent';
import type ICourse from '@/interfaces/components/molecules/course';

const courses = ref<ICourse[]>();

try {
  courses.value = coursesStoreToCoursesComponent(
    await $fetch('/api/course/readRated'),
  );
} catch (error: any) {
  console.error(error.message);
}
</script>
