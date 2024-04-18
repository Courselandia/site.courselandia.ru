<template>
  <div class="header-teacher-directions">
    <HeaderTeacherDirection
      v-for="(direction, key) in directions"
      :key="key"
      :name="direction.name"
      :link="direction.link"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import HeaderTeacherDirection from '@/components/modules/catalog/atoms/HeaderTeacherDirection.vue';
import type IDirectionLink from '@/interfaces/stores/course/directionLink';

defineProps({
  directions: {
    type: Array as PropType<Array<IDirectionLink>>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/headerTeacherDirections";
</style>
