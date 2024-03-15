<template>
  <div
    v-if="publications?.length"
    class="list"
  >
    <Publication
      v-for="(publication, key) in publications"
      :key="key"
      :publication="publication"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
} from 'vue';

import { apiReadPublications } from '@/api/publication';
import Publication from '@/components/modules/publications/molecules/Publication.vue';
import type IPublication from '@/interfaces/stores/publication/publication';

const publications = ref<Array<IPublication>>();

try {
  const response = await apiReadPublications(true);
  publications.value = response?.data?.publications;
} catch (error: any) {
  console.error(error.message);
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/publications/molecules/list";
</style>
