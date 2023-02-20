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
import { IResponseItems } from '@/interfaces/response';
import ISchool from '@/interfaces/stores/school/school';
import school from '@/stores/school';

const config = useRuntimeConfig();
const brands = ref<Array<IBrand>>([]);

const {
  readSchools,
} = school();

const loadSchools = async ():
  Promise<IResponseItems<ISchool>> => readSchools(config.public.apiUrl);

try {
  const resultSchools = await useAsyncData('schools', async () => loadSchools());
  brands.value = schoolsToBrand(resultSchools.data.value?.data);
} catch (error: any) {
  console.error(error.message);
}
</script>

<style lang="scss">
@import "assets/scss/components/organism/brands.scss";
</style>
