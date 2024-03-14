<template>
  <div
    v-if="course.processes"
    class="processes"
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
import type { PropType } from 'vue';

import BlockCheck from '@/components/modules/course/atoms/BlockCheck.vue';
import type ICourse from '@/interfaces/components/modules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/processes";
</style>
