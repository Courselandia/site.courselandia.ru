<template>
  <nuxt-link to="/favorites" class="favorite">
    <div class="favorite__icon">
      <Icon
        name="heart"
        :size="[20, 18]"
        color="blue"
      />
    </div>
    <div class="favorite__text">
      Избранные
    </div>
    <div class="favorite__amount">
      8
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import Icon from '@/components/atoms/Icon.vue';
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/favorite.scss";
</style>
