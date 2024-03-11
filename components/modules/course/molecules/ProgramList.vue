<template>
  <div class="program-list">
    <div class="program-list__items">
      <ProgramItem
        v-for="(item, key) in program"
        :key="key"
        :item="item"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import ProgramItem from '@/components/modules/course/atoms/ProgramItem.vue';
import type IProgram from '@/interfaces/components/molecules/program';

const props = defineProps({
  program: {
    type: Array as PropType<Array<IProgram>>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/programList";
</style>
