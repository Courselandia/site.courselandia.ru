<template>
  <div class="program">
    <div class="program__items">
      <ProgramItem
        v-for="(item, key) in program"
        :key="key"
        :item="item"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import ProgramItem from '@/components/atoms/ProgramItem.vue';
import IProgram from '@/interfaces/components/molecules/program';

const props = defineProps({
  program: {
    type: Array as PropType<Array<IProgram>>,
    required: true,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/program.scss";
</style>
