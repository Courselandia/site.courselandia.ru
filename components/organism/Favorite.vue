<template>
  <nuxt-link
    to="/favorites"
    class="favorite"
    @mouseenter="onMouseOver"
    @mouseleave="onMouseLeave"
    @focusin="onMouseOver"
    @focusout="onMouseOver"
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
      {{ amountFavorites }}
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import favorite from '@/stores/favorite';

const {
  amountFavorites,
} = storeToRefs(favorite());

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
