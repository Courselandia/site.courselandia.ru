<template>
  <div>
    <div class="content">
      <Hero />
      <Brands class="mb-40 mb-12-sm" />
      <Directions />
    </div>
    <TheBest />
    <Promotions />
    <AboutUs />
  </div>
</template>

<script lang="ts" setup>
import AboutUs from '@/components/modules/home/organism/AboutUs.vue';
import Brands from '@/components/modules/home/organism/Brands.vue';
import Directions from '@/components/modules/home/organism/Directions.vue';
import Hero from '@/components/modules/home/organism/Hero.vue';
import Promotions from '@/components/modules/home/organism/Promotions.vue';
import TheBest from '@/components/modules/home/organism/TheBest.vue';
</script>

<style lang="scss">
@import "@/assets/scss/components/modules/home/index";
</style>
