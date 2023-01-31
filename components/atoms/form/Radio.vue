<template>
  <div
    :class="`radio ${checked ? 'radio--checked' : ''}`"
    @click="onClick"
    @keydown="onClick"
  >
    <div class="radio__box">
      <transition name="fade">
        <div
          v-if="checked"
          class="radio__checked"
        />
      </transition>
    </div>
    <div class="radio__label">
      {{ label }}
    </div>
    <input
      :name="name"
      :value="value"
      :checked="checked"
      type="radio"
      class="radio__element"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number, Boolean],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const instance = getCurrentInstance();

const checked = computed((): boolean => instance?.parent?.exposed?.input.value === props.value);
const onClick = (): void => {
  instance?.parent?.exposed?.onChangeValue(props.value);
};
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/form/radio.scss";
</style>
