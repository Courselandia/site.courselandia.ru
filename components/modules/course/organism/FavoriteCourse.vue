<template>
  <div
    :class="`favorite-course ${nameClass}`"
    @click.stop="onClick"
    @keyup.stop="onClick"
  >
    <transition name="fade-fast" mode="out-in">
      <Icon
        v-if="hasFavorite(id)"
        name="heart-full"
        :size="[25, 24]"
        color="blue2"
      />
      <Icon
        v-else
        name="heart"
        :size="[25, 24]"
        color="blue2"
      />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import type {
  PropType,
} from 'vue';
import {
  computed,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import track from '@/helpers/track';
import favorite from '@/stores/favorite';
import type TId from '@/types/id';

const props = defineProps({
  id: {
    type: [String, Number] as PropType<TId>,
    required: true,
  },
  mobile: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const emit = defineEmits({
  click: () => true,
});

const {
  addFavorite,
  removeFavorite,
  hasFavorite,
} = favorite();

const nameClass = computed(() => {
  const classes = [];

  if (props.mobile) {
    classes.push('favorite-course--mobile');
  }

  return classes.join(' ');
});

const onClick = (event: any): void => {
  if (hasFavorite(props.id)) {
    removeFavorite(props.id);
  } else {
    addFavorite(props.id);
    track('favorite');
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/organism/favoriteCourse";
</style>
