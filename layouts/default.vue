<template>
  <Header />
  <slot />
  <Footer />
</template>

<script lang="ts" setup>
import Footer from '@/components/organism/Footer.vue';
import Header from '@/components/organism/Header.vue';
</script>
