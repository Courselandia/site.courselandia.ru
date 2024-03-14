<template>
  <LazyClientOnly>
    <teleport to=".page">
      <Follow
        :course="course"
      />
    </teleport>
  </LazyClientOnly>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import Follow from '@/components/modules/course/molecules/Follow.vue';
import type ICourse from '@/interfaces/components/modules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>
