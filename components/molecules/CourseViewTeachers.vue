<template>
  <div
    v-if="course.teachers"
    class="course-view-teachers"
  >
    <div class="course-view-teachers__items">
      <nuxt-link
        v-for="(teacher, key) in course.teachers"
        :key="key"
        :to="teacher.link"
        class="course-view-teachers__item"
      >
        <div class="course-view-teachers__picture">
          <LazyImage
            v-if="teacher.image?.path"
            :src="teacher.image.path"
            class="course-view-teachers__image"
            :alt="teacher.label"
            :title="teacher.label"
          />
          <Animal
            v-else
          />
        </div>
        <div class="course-view-teachers__info">
          <div class="course-view-teachers__name">
            {{ teacher.label }}
          </div>
          <ClientOnly>
            <div
              v-if="teacher.extra"
              class="course-view-teachers__position"
            >
              {{ teacher.extra }}
            </div>
          </ClientOnly>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import Animal from '@/components/atoms/Animal.vue';
import LazyImage from '@/components/atoms/LazyImage.vue';
import ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courseViewTeachers.scss";
</style>
