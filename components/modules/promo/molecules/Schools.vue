<template>
  <div class="schools">
    <School
      v-for="(school, key) in schools"
      :key="key"
      :school="school"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  type PropType,
  ref,
} from 'vue';

import { apiReadPromos } from '@/api/promo';
import School from '@/components/modules/promo/molecules/School.vue';
import type ISchool from '@/interfaces/stores/promo/school';

const props = defineProps({
  exclude: {
    type: Object as PropType<ISchool>,
    required: true,
  },
});

const filterSchools = (
  items: Array<ISchool>,
): Array<ISchool> => items.filter((item: ISchool) => item.id !== props.exclude.id)
  .sort((first: ISchool, second: ISchool) => {
    if (first.rating > second.rating) {
      return -1;
    }

    if (first.rating < second.rating) {
      return 1;
    }

    return 0;
  }).slice(0, 4);

const schools = ref<Array<ISchool>>();

const promos = await apiReadPromos(true);
schools.value = filterSchools(promos);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/molecules/schools";
</style>
