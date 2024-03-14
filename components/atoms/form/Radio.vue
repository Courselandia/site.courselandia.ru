<template>
  <div
    :class="`radio ${nameClass}`"
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
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits({
  click: (_: string | number | boolean) => true,
});

const instance = getCurrentInstance();

const checked = computed((): boolean => instance?.parent?.exposed?.input.value === props.value);
const onClick = (): void => {
  if (!props.disabled) {
    instance?.parent?.exposed?.onChangeValue(props.value);
    emit('click', props.value);
  }
};

const nameClass = computed(() => {
  const classes = [];

  if (checked.value) {
    classes.push('radio--checked');
  }

  if (props.disabled) {
    classes.push('radio--disabled');
  }

  return classes.join(' ');
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/atoms/form/radio";
</style>
