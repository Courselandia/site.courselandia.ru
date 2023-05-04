<template>
  <div
    v-if="course.processes"
    class="course-view-processes"
  >
    <BlockCheck
      v-for="(process, key) in course.processes"
      :key="key"
    >
      <template #title>
        {{ process.name }}
      </template>
      <template #description>
        <div v-html="process.text" />
      </template>
    </BlockCheck>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import BlockCheck from '@/components/atoms/BlockCheck.vue';
import ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courseViewProcesses.scss";
</style>
