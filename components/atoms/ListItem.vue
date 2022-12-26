<template>
  <div class="list-item">
    <div
      v-if="icon"
      class="list-item__icon"
    >
      <Icon
        :name="icon"
        color="blueGrey8"
        :size="[20, 20]"
      />
    </div>
    <div class="list-item__description">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import TIcon from '@/types/icon';

const props = defineProps({
  icon: {
    type: String as PropType<TIcon>,
    required: false,
    default: null,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/listItem.scss";
</style>
