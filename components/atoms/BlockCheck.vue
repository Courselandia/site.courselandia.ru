<template>
  <div class="block-check">
    <div class="block-check__icon">
      <Icon
        name="checked-circle"
        color="black"
        :size="[24, 24]"
      />
    </div>
    <div class="block-check__title">
      <slot name="title" />
    </div>
    <div class="block-check__description">
      <slot name="description" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Icon from '@/components/atoms/Icon.vue';
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/blockCheck.scss";
</style>
