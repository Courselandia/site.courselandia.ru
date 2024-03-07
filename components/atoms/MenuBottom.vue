<template>
  <div class="menu-bottom">
    <div
      v-for="(item, key) in items"
      :key="key"
      class="menu-bottom__item"
    >
      <nuxt-link
        :to="item.path"
        class="menu-bottom__link"
      >
        {{ item.label }}
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import type IMenu from '@/interfaces/menu';

const props = defineProps({
  items: {
    type: Array as PropType<Array<IMenu>>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/atoms/menuBottom.scss";
</style>
