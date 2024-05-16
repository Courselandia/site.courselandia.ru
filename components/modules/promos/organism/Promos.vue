<template>
  <div class="promos content mt-12 mb-24 mb-12-sm">
    <h1 class="title title--1">
      Скидки в онлайн школах
    </h1>
    <Description />
    <Directions
      v-model:direction="direction"
    />
    <PromoList
      :direction="direction"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import Description from '@/components/modules/promos/atoms/Description.vue';
import Directions from '@/components/modules/promos/molecules/Directions.vue';
import PromoList from '@/components/modules/promos/molecules/PromoList.vue';
import EDirection from '@/enums/direction';

const route = useRoute();
const directionCurrent = route.query.direction as string;
const direction = ref<EDirection | null>(Number(directionCurrent) as unknown as EDirection || null);

const toHistory = (): void => {
  let url = '/promos';
  const queries: Array<string> = [];

  if (direction.value) {
    queries[queries.length] = `direction=${direction.value}`;
  }

  if (queries.length) {
    url += `?${queries.join('&')}`;
  }

  const newState = {
    current: url,
  };

  window.history.pushState(
    newState,
    '',
    url,
  );
};

watch(direction, () => {
  toHistory();
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promos/organism/promos";
</style>
