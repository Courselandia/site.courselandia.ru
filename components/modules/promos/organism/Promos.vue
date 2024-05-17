<template>
  <div class="promos content mt-12 mb-24 mb-12-sm">
    <div
      ref="contentRef"
    >
      <h1 class="title title--1">
        Скидки в онлайн школах
      </h1>
      <Description />
      <Directions
        v-model:direction="direction"
      />
      <PromoBody
        :direction="direction"
        :scroll="scroll"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  onMounted,
  ref,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';

import Description from '@/components/modules/promos/atoms/Description.vue';
import Directions from '@/components/modules/promos/molecules/Directions.vue';
import PromoBody from '@/components/modules/promos/molecules/PromoBody.vue';
import EDirection from '@/enums/direction';

const route = useRoute();
const scroll = ref(true);
const directionCurrent = route.query.direction as string;
const direction = ref<EDirection | null>(Number(directionCurrent) as unknown as EDirection || null);
const contentRef = ref<HTMLElement | null>(null);

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

const setScroll = (): void => {
  const card = document.querySelector('#promo-stats');

  if (contentRef.value && card) {
    const gapHeight = window.screen.availHeight - card.getBoundingClientRect().height;
    const height = contentRef.value.offsetHeight;
    const top = contentRef.value.offsetTop;
    const screenHeight = window.screen.availHeight;
    const lineBottom = height + top - screenHeight + gapHeight;

    scroll.value = window.scrollY <= lineBottom;
  }
};

onMounted(() => {
  window.addEventListener('scroll', () => {
    setScroll();
  });

  setScroll();
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promos/organism/promos";
</style>
