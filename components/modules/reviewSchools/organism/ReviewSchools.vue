<template>
  <div class="review-schools">
    <Directions
      v-model:direction="direction"
    />
    <List
      v-model:sort="sort"
      :direction="direction"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';

import Directions from '@/components/modules/reviewSchools/organism/Directions.vue';
import List from '@/components/modules/reviewSchools/organism/List.vue';
import EDirection from '@/enums/direction';
import type ISort from '@/interfaces/sort';
import type { TOrder } from '@/types/order';

const route = useRoute();
const directionCurrent = route.query.direction as string;
const sortByCurrent = route.query.sortBy as string;
const sortOrderCurrent = route.query.sortOrder as string;

const sortDefault: ISort = {
  sortBy: 'rating',
  sortOrder: 'DESC',
};

const direction = ref<EDirection | null>(Number(directionCurrent) as unknown as EDirection || null);
const sort = ref<ISort>({
  sortBy: sortByCurrent || sortDefault.sortBy,
  sortOrder: sortOrderCurrent as TOrder || sortDefault.sortOrder,
});

const toHistory = (): void => {
  let url = '/reviews';
  const queries: Array<string> = [];

  if (
    sort.value && (
      sort.value?.sortBy !== sortDefault.sortBy
      || sort.value?.sortOrder !== sortDefault.sortOrder
    )
  ) {
    queries[queries.length] = `sortBy=${sort.value.sortBy}&sortOrder=${sort.value.sortOrder}`;
  }

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

watch(sort, () => {
  toHistory();
}, {
  deep: true,
});

watch(direction, () => {
  toHistory();
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviewSchools/organism/reviewSchools";
</style>
