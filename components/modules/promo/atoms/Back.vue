<template>
  <nuxt-link
    to="/promos"
    class="back"
    prefetch
  >
    <div class="back__icon">
      <Icon
        name="arrow-long-left"
        color="blue2"
        :size="[16, 16]"
      />
    </div>
    <div class="back__text">
      Все промокоды и акции
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import Icon from '@/components/atoms/Icon.vue';
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/atoms/back";
</style>
