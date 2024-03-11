<template>
  <div
    v-if="course.teachers"
    class="teachers"
  >
    <div class="teachers__items">
      <nuxt-link
        v-for="(teacher, key) in course.teachers"
        :key="key"
        :to="teacher.link"
        class="teachers__item"
      >
        <div class="teachers__picture">
          <LazyImage
            v-if="teacher.image?.path"
            :src="teacher.image.path"
            class="teachers__image"
            :alt="teacher.label"
            :title="teacher.label"
          />
          <Animal
            v-else
          />
        </div>
        <div class="teachers__info">
          <div class="teachers__name">
            {{ teacher.label }}
          </div>
          <ClientOnly>
            <div
              v-if="teacher.extra"
              class="teachers__position"
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
import type { PropType } from 'vue';

import Animal from '@/components/atoms/Animal.vue';
import LazyImage from '@/components/atoms/LazyImage.vue';
import type ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/teachers";
</style>
