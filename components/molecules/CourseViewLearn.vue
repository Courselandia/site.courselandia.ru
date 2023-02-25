<template>
  <Numerics>
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
import { PropType } from 'vue';

import Numeric from '@/components/atoms/Numeric.vue';
import Numerics from '@/components/molecules/Numerics.vue';
import ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>
