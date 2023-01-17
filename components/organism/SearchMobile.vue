<template>
  <div class="search-mobile">
    <div class="search-mobile__icon">
      <Icon
        name="loop"
        color="blue2"
        :size="[20, 20]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Icon from '@/components/atoms/Icon.vue';
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/searchMobile.scss";
</style>
