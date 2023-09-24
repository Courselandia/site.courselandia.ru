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

import Brand from '@/components/atoms/Brand.vue';
import schoolsToBrand from '@/converts/schoolsToBrand';
import IBrand from '@/interfaces/components/organism/brands';
import school from '@/stores/school';

const { schools } = storeToRefs(school());
const brands = ref<Array<IBrand>>(schoolsToBrand(schools.value));
</script>

<style lang="scss">
@import "assets/scss/components/organism/brands.scss";
</style>
