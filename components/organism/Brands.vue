<template>
  <div class="brands">
    <template
      v-for="(brand, key) in brands"
    >
      <Brand
        v-if="brand.image"
        :key="key"
        :label="brand.label"
        :url="brand.url"
        :image="brand.image"
        :width="brand.width"
        :height="brand.height"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
} from 'vue';

import Brand from '@/components/atoms/Brand.vue';
import schoolsToBrand from '@/converts/schoolsToBrand';
import IBrand from '@/interfaces/components/organism/brands';

const config = useRuntimeConfig();
const brands = ref<Array<IBrand>>();

try {
  brands.value = schoolsToBrand(await $fetch('/api/school/read'));
} catch (error: any) {
  console.error(error.message);
}
</script>

<style lang="scss">
@import "assets/scss/components/organism/brands.scss";
</style>
