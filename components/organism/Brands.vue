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
import {
  ref,
} from 'vue';

import { apiReadSchools } from '@/api/school';
import Brand from '@/components/atoms/Brand.vue';
import schoolsToBrand from '@/converts/schoolsToBrand';
import IBrand from '@/interfaces/components/organism/brands';

const config = useRuntimeConfig();
const brands = ref<Array<IBrand>>();

try {
  brands.value = schoolsToBrand(await apiReadSchools(config.public.apiUrl));
} catch (error: any) {
  console.error(error.message);
}
</script>

<style lang="scss">
@import "assets/scss/components/organism/brands.scss";
</style>
