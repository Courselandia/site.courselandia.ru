<template>
  <div
    class="favorite-course"
    @mouseenter="onMouseEnter"
    @focusin="onMouseEnter"
    @mouseleave="onMouseLeave"
    @focusout="onMouseLeave"
  >
    <transition name="fade-fast" mode="out-in">
      <Icon
        v-if="hover"
        name="heart-full"
        :size="[25, 23]"
        color="blue2"
      />
      <Icon
        v-else
        name="heart"
        :size="[25, 23]"
        color="blue2"
      />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';

const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  },
});

const hover = ref(false);

const onMouseEnter = (): void => {
  hover.value = true;
};

const onMouseLeave = (): void => {
  hover.value = false;
};
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/favoriteCourse.scss";
</style>
