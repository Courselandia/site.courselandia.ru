<template>
  <div
    v-if="course.learns?.length"
    class="mb-40 mb-12-md"
  >
    <h2 class="title title--1">
      Чему вы научитесь
    </h2>

    <Learn
      :course="course"
    />
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue';

import Learn from '@/components/modules/course/molecules/Learn.vue';
import type ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>
