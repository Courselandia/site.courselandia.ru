<template>
  <div
    class="favorite-course"
    @click="onClick"
    @keyup="onClick"
  >
    <transition name="fade-fast" mode="out-in">
      <Icon
        v-if="hasFavorite(id)"
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
  PropType,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import track from '@/helpers/track';
import favorite from '@/stores/favorite';
import TId from '@/types/id';

const props = defineProps({
  id: {
    type: Number as PropType<TId>,
    required: true,
  },
});

const {
  addFavorite,
  removeFavorite,
  hasFavorite,
} = favorite();

const onClick = (): void => {
  if (hasFavorite(props.id)) {
    removeFavorite(props.id);
  } else {
    addFavorite(props.id);
    track('favorite');
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/favoriteCourse.scss";
</style>
