<template>
  <div class="page">
    <div class="page__header">
      <Header />
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
import Footer from '@/components/organism/Footer.vue';
import Header from '@/components/organism/Header.vue';
</script>

<style lang="scss">
@import "@/assets/scss/layouts/default.scss";
</style>
