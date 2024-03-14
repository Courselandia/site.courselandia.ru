<template>
  <div
    v-if="brands"
    class="brands"
  >
    <template
      v-for="(brand, key) in brands"
    >
      <Brand
        v-if="brand.image"
        :key="key"
        :label="brand.label"
        :url="brand.path"
        :image="brand.image"
        :width="brand.width || undefined"
        :height="brand.height || undefined"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import {
  ref,
} from 'vue';

import Brand from '@/components/modules/home/atoms/Brand.vue';
import schoolsToBrand from '@/converts/schoolsToBrand';
import type IBrand from '@/interfaces/components/modules/home/brands';
import school from '@/stores/school';

const { schools } = storeToRefs(school());
const brands = ref<Array<IBrand>>(schoolsToBrand(schools.value));
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/home/organism/brands";
</style>
