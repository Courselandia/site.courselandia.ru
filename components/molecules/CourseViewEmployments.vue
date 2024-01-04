<template>
  <div
    v-if="course.employments"
    class="course-view-employments"
  >
    <BlockCheck
      v-for="(employment, key) in course.employments"
      :key="key"
    >
      <template #title>
        {{ employment.name }}
      </template>
      <template #description>
        <div v-html="employment.text" />
      </template>
    </BlockCheck>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import BlockCheck from '@/components/atoms/BlockCheck.vue';
import type ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courseViewEmployments.scss";
</style>
