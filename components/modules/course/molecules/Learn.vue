<template>
  <Numerics
    v-if="course.learns"
  >
    <Numeric
      v-for="(learn, key) in course.learns"
      :key="key"
      :number="key + 1"
    >
      {{ learn.text }}
    </Numeric>
  </Numerics>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import Numeric from '@/components/modules/course/atoms/Numeric.vue';
import Numerics from '@/components/modules/course/molecules/Numerics.vue';
import type ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>
