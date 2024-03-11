<template>
  <div class="mb-40 mb-12-md">
    <h2 class="title title--1">
      Информация
    </h2>

    <Info
      :course="course"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import Info from '@/components/modules/course/molecules/Info.vue';
import type ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>
