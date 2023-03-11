<template>
  <div
    :class="`checkbox ${nameClass}`"
    @click="onClick"
    @keydown="onClick"
  >
    <div class="checkbox__box">
      <transition name="fade">
        <div
          v-if="checked"
          class="checkbox__checked"
        />
      </transition>
    </div>
    <div class="checkbox__label">
      {{ label }}
    </div>
    <input
      :name="name"
      :value="value"
      :checked="checked"
      type="checkbox"
      class="checkbox__element"
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
    type: [String, Number],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const instance = getCurrentInstance();

const checked = computed(
  (): boolean => instance?.parent?.exposed?.input.value?.indexOf(props.value) !== -1,
);
const onClick = (): void => {
  if (!props.disabled) {
    instance?.parent?.exposed?.onChangeValue(props.value);
  }
};

const nameClass = computed(() => {
  const classes = [];

  if (checked.value) {
    classes.push('checkbox--checked');
  }

  if (props.disabled) {
    classes.push('checkbox--disabled');
  }

  return classes.join(' ');
});
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/form/checkbox.scss";
</style>
