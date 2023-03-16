<template>
  <div class="page">
    <div class="page__header">
      <div class="page__header-slide">
        <Header
          v-model:menu="menu"
          :active="active"
        />
      </div>
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
import {
  ref,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';

import Dropdowns from '@/components/organism/Dropdowns.vue';
import Footer from '@/components/organism/Footer.vue';
import Header from '@/components/organism/Header.vue';

const route = useRoute();
const menu = ref('');
const active = ref<string | null>('');

const setActive = (): void => {
  if (route.path.indexOf('/courses/school/') !== -1) {
    active.value = 'schools';
  } else if (route.path.indexOf('/courses') !== -1) {
    active.value = 'courses';
  } else {
    active.value = null;
  }
};

watch(route, () => {
  setActive();
});

setActive();
</script>

<style lang="scss">
@import "@/assets/scss/layouts/default.scss";
</style>
