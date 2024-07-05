<template>
  <div
    v-if="total"
    class="pagination"
  >
    <a
      v-if="pageCurrent !== 1"
      :href="link(pageCurrent - 1)"
      class="pagination__item pagination__item--back"
      @click.prevent="onClickPage(pageCurrent - 1)"
    >
      Назад
    </a>
    <template v-for="(num, key) in pages">
      <div
        v-if="num === '...'"
        :key="`dots_${key}`"
        class="pagination__item"
      >
        {{ num }}
      </div>
      <div
        v-if="pageCurrent === num"
        :key="`item_current_${key}`"
        class="pagination__item pagination__item--round pagination__item--current"
      >
        {{ num }}
      </div>
      <a
        v-else
        :key="`item_${key}`"
        class="pagination__item pagination__item--round pagination__item--hover"
        :href="link(key + 1)"
        @click.prevent="onClickPage(num as number)"
      >
        {{ num }}
      </a>
    </template>
    <a
      v-if="pageCurrent !== (pages.length - 1)"
      :href="link(pageCurrent + 1)"
      class="pagination__item pagination__item--next"
      @click.prevent="onClickPage(pageCurrent - 1)"
    >
      Вперед
    </a>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  toRefs,
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
    default: 21,
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

const maxPages = 2;

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
    pgs[pgs.length] = 1;

    if (startPages !== 2) {
      pgs[pgs.length] = '...';
    }
  }

  for (let i = startPages; i <= endPages; i++) {
    pgs[pgs.length] = i;
  }

  if (endPages !== paginations.value) {
    if ((endPages + 1) !== paginations.value) {
      pgs[pgs.length] = '...';
    }

    pgs[pgs.length] = paginations.value;
  }

  return pgs;
});

const onClickPage = (toPage: number): void => {
  emit('click', toPage);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/atoms/pagination";
</style>
