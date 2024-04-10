<template>
  <div class="publications content mt-12 mb-24 mb-12-sm">
    <h1 class="title title--1">
      Подборки курсов
    </h1>
    <Description />
    <Directions
      v-model:direction="direction"
    />
    <List
      v-model:page="page"
      :direction="direction"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import Description from '@/components/modules/collections/atoms/Description.vue';
import Directions from '@/components/modules/collections/molecules/Directions.vue';
import List from '@/components/modules/collections/molecules/List.vue';
import EDirection from '@/enums/direction';

const route = useRoute();
const directionCurrent = route.query.direction as string;
const page = ref<number>(Number(route.query.page || 1));
const direction = ref<EDirection | null>(Number(directionCurrent) as unknown as EDirection || null);

const toHistory = (): void => {
  let url = '/collections';
  const queries: Array<string> = [];

  if (direction.value) {
    queries[queries.length] = `direction=${direction.value}`;
  }

  if (page.value) {
    queries[queries.length] = `page=${page.value}`;
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

watch(page, () => {
  toHistory();
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/collections/organism/collections";
</style>
