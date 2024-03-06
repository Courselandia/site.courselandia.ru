<template>
  <div>
    <div class="content">
      <Hero />
      <Brands class="mb-40 mb-12-sm" />
      <Directions />
    </div>
    <TheBest />
    <AboutUs />
  </div>
</template>

<script lang="ts" setup>
import AboutUs from '@/components/modules/home/organism/AboutUs.vue';
import Brands from '@/components/modules/home/organism/Brands.vue';
import Directions from '@/components/modules/home/organism/Directions.vue';
import Hero from '@/components/modules/home/organism/Hero.vue';
import TheBest from '@/components/modules/home/organism/TheBest.vue';

useRouteCache((helper: any) => {
  helper.setMaxAge(3600 * 24).setCacheable().addTags(['index']);
});
</script>

<style lang="scss">
@import "@/assets/scss/components/modules/index";
</style>
