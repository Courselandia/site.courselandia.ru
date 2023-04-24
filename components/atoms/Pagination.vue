<template>
  <div
    v-if="total"
    class="pagination"
  >
    <template v-if="link">
      <template v-for="(num, key) in pages">
        <div
          v-if="num === '...'"
          :key="`dots_${key}`"
          class="pagination__item"
        >
          {{ num }}
        </div>
        <nuxt-link
          v-else
          :key="`item_${key}`"
          :class="`pagination__item ${pageCurrent === num ? 'pagination__item--current' : ''}`"
          :to="link(key + 1)"
        >
          {{ num }}
        </nuxt-link>
      </template>
    </template>
    <template v-else>
      <template v-for="(num, key) in pages">
        <div
          v-if="num === '...'"
          :key="`dots_${key}`"
          class="pagination__item"
        >
          {{ num }}
        </div>
        <div
          v-else
          :key="`item_${key}`"
          :class="`pagination__item ${pageCurrent === num ? 'pagination__item--current' : ''}`"
          @click="onClickPagination(num)"
          @keyup="onClickPagination(num)"
        >
          {{ num }}
        </div>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  ref,
  toRef, toRefs,
} from 'vue';

const props = defineProps({
  total: {
    type: Number,
    required: false,
    default: 0,
  },
  page: {
    type: Number,
    required: false,
    default: 1,
  },
  size: {
    type: Number,
    required: false,
    default: 18,
  },
  link: {
    type: Function,
    required: false,
    default: null,
  },
});

const {
  page,
  total,
  size,
} = toRefs(props);

const emit = defineEmits({
  click: (_: number) => true,
});

const maxPages = 4;

const paginations = computed((): number => Math.ceil(total.value / size.value));

const pageCurrent = computed(
  (): number => (page.value >= 1 && page.value <= paginations.value ? page.value : 1),
);

const pages = computed<Array<number | string>>((): Array<number | string> => {
  const pgs: Array<number | string> = [];
  let startPages = 1;
  let endPages = paginations.value;

  if (pageCurrent.value > maxPages) {
    startPages = pageCurrent.value - maxPages;
  }

  if ((pageCurrent.value + maxPages) < endPages) {
    endPages = pageCurrent.value + maxPages;
  }

  if (startPages !== 1) {
    pgs[pgs.length] = '...';
  }

  for (let i = startPages; i <= endPages; i++) {
    pgs[pgs.length] = i;
  }

  if (endPages !== paginations.value) {
    pgs[pgs.length] = '...';
  }

  return pgs;
});

const onClickPagination = (pagination: number | string) => {
  emit('click', pagination);
};
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/pagination.scss";
</style>
