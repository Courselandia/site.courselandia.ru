<template>
  <a
    :href="url"
    target="_blank"
    rel="nofollow noopener noreferrer"
    class="course-tile-button-go"
    @mousedown="onClickActive"
    @mouseup="onClickDisable"
    @mouseleave="onClickDisable"
    @focusout="onClickDisable"
    @click="onClickGoSchool"
  >
    Перейти на сайт
  </a>
</template>

<script setup lang="ts">
import {
  ref,
  toRefs,
  watch,
} from 'vue';

import track from '@/helpers/track';

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits({
  'update:active': (_: Boolean) => true,
});

const {
  active,
} = toRefs(props);

const activeValue = ref<Boolean>(active.value);

watch(activeValue, () => {
  emit('update:active', activeValue.value);
});

watch(active, () => {
  activeValue.value = active.value;
});

const onClickActive = (): void => {
  activeValue.value = true;
};

const onClickDisable = (): void => {
  activeValue.value = false;
};

const onClickGoSchool = (): void => {
  track('school');
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/courseTileButtonGo";
</style>
