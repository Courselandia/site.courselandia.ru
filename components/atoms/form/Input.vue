<template>
  <div
    :class="`input ${nameClass}`"
    @mouseenter="onMouseOver"
    @mouseleave="onMouseLeave"
    @focusin="onMouseOver"
    @focusout="onMouseLeave"
  >
    <div class="input__before">
      <slot name="before" />
    </div>
    <div class="input__place">
      <input
        v-model="input"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        class="input__element"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>
    <div class="input__after">
      <slot name="after" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  ref,
  toRefs,
  watch,
} from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: null,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
});

const {
  value,
} = toRefs(props);

const emit = defineEmits({
  'update:value': (_: String | Number) => true,
  'focus': () => true,
});

const input = ref(value.value);
const hover = ref(false);
const focus = ref(false);

watch(input, () => {
  emit('update:value', input.value);
});

watch(value, () => {
  input.value = value.value;
});

const nameClass = computed(() => {
  const classes = [];

  if (hover.value) {
    classes.push('input--hover');
  }

  if (focus.value) {
    classes.push('input--focus');
  }

  return classes.join(' ');
});

const onMouseOver = (): void => {
  hover.value = true;
};

const onMouseLeave = (): void => {
  hover.value = false;
};

const onFocus = (): void => {
  focus.value = true;

  emit('focus');
};

const onBlur = (): void => {
  focus.value = false;
};
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/form/input.scss";
</style>
