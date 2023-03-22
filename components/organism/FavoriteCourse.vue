<template>
  <div
    class="favorite-course"
    @mouseenter="onMouseEnter"
    @focusin="onMouseEnter"
    @mouseleave="onMouseLeave"
    @focusout="onMouseLeave"
    @click="onClick"
  >
    <transition name="fade-fast" mode="out-in">
      <Icon
        v-if="hover || hasFavorite(id)"
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
import { storeToRefs } from 'pinia';
import {
  PropType,
  ref,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import favorite from '@/stores/favorite';
import TId from '@/types/id';

const props = defineProps({
  id: {
    type: Number as PropType<TId>,
    required: true,
  },
});

const hover = ref(false);
const {
  addFavorite,
  removeFavorite,
  hasFavorite,
} = favorite();

const onMouseEnter = (): void => {
  hover.value = true;
};

const onMouseLeave = (): void => {
  hover.value = false;
};

const onClick = (): void => {
  if (hasFavorite(props.id)) {
    removeFavorite(props.id);
  } else {
    addFavorite(props.id);
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/favoriteCourse.scss";
</style>
