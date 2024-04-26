<template>
  <div class="course-box-button">
    <nuxt-link
      :to="link"
      class="course-box-button__link"
      prefetch
      @mousedown="onClickActive"
      @mouseup="onClickDisable"
      @mouseleave="onClickDisable"
      @focusout="onClickDisable"
    >
      Подробнее
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  toRefs,
  watch,
} from 'vue';

const props = defineProps({
  link: {
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
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/courseBoxButtonView";
</style>
