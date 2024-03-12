<template>
  <div class="salary-explanation">
    На позиции
    <template v-if="level === ELevel.JUNIOR">
      Junior
    </template>
    <template v-else-if="level === ELevel.MIDDLE">
      Middle
    </template>
    <template v-else-if="level === ELevel.SENIOR">
      Senior
    </template>
    {{ name }}
    вы заработаете столько же, сколько стоит курс,
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import ELevel from '@/enums/stores/course/level';

const props = defineProps({
  level: {
    type: Object as PropType<ELevel>,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/atoms/salaryExplanation";
</style>
