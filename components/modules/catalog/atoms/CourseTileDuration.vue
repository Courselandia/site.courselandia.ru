<template>
  <div :class="`course-tile-duration ${point ? 'course-tile-duration--point' : ''}`">
    {{ getDuration(duration, unit) }}
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import EDuration from '@/enums/components/molecules/duration';
import getDuration from '@/helpers/duration';

const props = defineProps({
  duration: {
    type: Number,
    required: true,
  },
  unit: {
    type: String as PropType<EDuration>,
    required: true,
  },
  point: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/courseTileDuration";
</style>
