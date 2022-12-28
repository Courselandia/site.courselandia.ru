<template>
  <div class="menu-top">
    <div
      v-for="(item, key) in menu"
      :key="key"
      class="menu-top__item"
    >
      <nuxt-link
        :to="item.link"
        class="menu-top__link"
      >
        {{ item.label }}
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import IMenu from '@/interfaces/menu';

const menu = ref<IMenu[]>([
  {
    label: 'Курсы',
    link: '/courses',
  },
  {
    label: 'Школы',
    link: '/schools',
  },
  {
    label: 'Отзывы о школе',
    link: '/reviews',
  },
  {
    label: 'Блог',
    link: '/blog',
  },
]);
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/menuTop.scss";
</style>
