<template>
  <nuxt-link
    to="/favorites"
    class="favorite"
    @mouseenter="onMouseOver"
    @mouseleave="onMouseLeave"
  >
    <div class="favorite__icon">
      <Icon
        name="heart"
        :size="[20, 18]"
        color="blue2"
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
import { ref } from 'vue';

import Icon from '@/components/atoms/Icon.vue';

const hover = ref(false);

const onMouseOver = (): void => {
  hover.value = true;
};

const onMouseLeave = (): void => {
  hover.value = false;
};
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/favorite.scss";
</style>
