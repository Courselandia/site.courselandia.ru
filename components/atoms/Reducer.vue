<template>
  <div class="reducer">
    <div
      :class="`reducer__content ${show ? 'reducer__content--show' : 'reducer__content--hide'}`"
      :style="{ height: show ? 'auto' : height + 'px' }"
    >
      <slot />
    </div>
    <div
      v-if="show"
      class="reducer__to_hide"
      @click="onClick(false)"
      @keyup="onClick(false)"
    >
      <div class="reducer__action">
        <slot name="hide" />
      </div>
    </div>
    <div
      v-else
      class="reducer__to_show"
      @click="onClick(true)"
      @keyup="onClick(true)"
    >
      <div class="reducer__action">
        <slot name="show" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
} from 'vue';

const props = defineProps({
  height: {
    type: Number,
    required: false,
    default: 410,
  },
});

const show = ref(false);

const onClick = (status: boolean): void => {
  show.value = status;
};
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/reducer.scss";
</style>
