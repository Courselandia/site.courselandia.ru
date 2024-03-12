<template>
  <div class="card-feature">
    <div class="card-feature__icon">
      <Icon
        :name="icon"
        color="black"
        :size="[22, 22]"
      />
    </div>
    <div class="card-feature__value">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import type TIcon from '@/types/icon';

const props = defineProps({
  icon: {
    type: String as PropType<TIcon>,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/atoms/cardFeature";
</style>
