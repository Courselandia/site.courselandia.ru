<template>
  <nuxt-link
    to="/collections"
    class="back"
  >
    <div class="back__icon">
      <Icon
        name="arrow-long-left"
        color="blue2"
        :size="[16, 16]"
      />
    </div>
    <div class="back__text">
      Все подборки
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import Icon from '@/components/atoms/Icon.vue';
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/collection/atoms/back";
</style>
