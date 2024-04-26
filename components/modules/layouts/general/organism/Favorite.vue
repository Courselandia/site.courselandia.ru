<template>
  <nuxt-link
    to="/favorites"
    class="favorite"
    prefetch
    @mouseenter="onMouseOver"
    @mouseleave="onMouseLeave"
    @focusin="onMouseOver"
    @focusout="onMouseOver"
  >
    <div class="favorite__icon">
      <Icon
        name="heart"
        :size="[20, 19]"
        color="blue2"
      />
    </div>
    <div class="favorite__text">
      Избранные
    </div>
    <div class="favorite__amount">
      {{ amount }}
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import favorite from '@/stores/favorite';

const {
  amount,
} = storeToRefs(favorite());

const hover = ref(false);

const onMouseOver = (): void => {
  hover.value = true;
};

const onMouseLeave = (): void => {
  hover.value = false;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/layouts/general/organism/favorite";
</style>
