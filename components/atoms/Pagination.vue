<template>
  <div
    v-if="total"
    class="pagination"
  >
    <template v-if="link">
      <nuxt-link
        v-for="(pagination, key) in paginations"
        :key="key"
        :to="link(key)"
        class="pagination__item"
      >
        {{ pagination }}
      </nuxt-link>
    </template>
    <template v-else>
      <div
        v-for="(pagination, key) in paginations"
        :key="key"
        class="pagination__item"
        @click="onClickPagination(pagination)"
        @keyup="onClickPagination(pagination)"
      >
        {{ pagination }}
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

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

const emit = defineEmits({
  click: (_: number) => true,
});

const paginations = ref(Math.ceil(props.total / props.size));

const onClickPagination = (pagination: number) => {
  emit('click', pagination);
};
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/pagination.scss";
</style>
