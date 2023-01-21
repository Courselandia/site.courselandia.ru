<template>
  <div class="brands">
    <Brand
      v-for="(brand, key) in brands"
      :key="key"
      :label="brand.label"
      :url="brand.url"
      :image="brand.image"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
} from 'vue';

import Brand from '@/components/atoms/Brand.vue';
import IBrand from '@/interfaces/components/organism/brands';

const brands = ref<Array<IBrand>>([
  {
    label: 'Нетология',
    url: 'courses/schools/netology',
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/1.png',
  },
  {
    label: 'Skillbox',
    url: 'courses/schools/skillbox',
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/2.png',
  },
  {
    label: 'GeekBrains',
    url: 'courses/schools/gb',
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/3.png',
  },
  {
    label: 'Нетология',
    url: 'courses/schools/netology',
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/1.png',
  },
  {
    label: 'Нетология',
    url: 'courses/schools/netology',
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/1.png',
  },
  {
    label: 'Skillbox',
    url: 'courses/schools/skillbox',
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/2.png',
  },
  {
    label: 'GeekBrains',
    url: 'courses/schools/gb',
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/3.png',
  },
  {
    label: 'Skillbox',
    url: 'courses/schools/skillbox',
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/2.png',
  },
  {
    label: 'Нетология',
    url: 'courses/schools/netology',
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/1.png',
  },
  {
    label: 'GeekBrains',
    url: 'courses/schools/gb',
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/3.png',
  },
  {
    label: 'Skillbox',
    url: 'courses/schools/skillbox',
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/2.png',
  },
  {
    label: 'GeekBrains',
    url: 'courses/schools/gb',
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/3.png',
  },
]);
</script>

<style lang="scss">
@import "assets/scss/components/organism/brands.scss";
</style>
