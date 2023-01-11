<template>
  <div class="page">
    <div class="page__header">
      <Header v-model:menu="menu" />
    </div>
    <div class="page__dropdown">
      <Dropdowns v-model:menu="menu" />
    </div>
    <div class="page__body">
      <slot />
    </div>
    <div class="page__footer">
      <Footer />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import Dropdowns from '@/components/organism/Dropdowns.vue';
import Footer from '@/components/organism/Footer.vue';
import Header from '@/components/organism/Header.vue';

const menu = ref('');
</script>

<style lang="scss">
@import "@/assets/scss/layouts/default.scss";
</style>
