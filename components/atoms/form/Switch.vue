<template>
  <div
    :class="`switch ${nameClass}`"
    @click="onClick"
    @keyup="onClick"
  >
    <div class="switch__mark" />
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
  value: {
    type: Boolean,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const {
  value,
} = toRefs(props);

const emit = defineEmits({
  'update:value': (_: Boolean) => true,
  click: (_: Boolean) => true,
});

const input = ref(value.value);

watch(input, () => {
  emit('update:value', input.value);
});

watch(value, () => {
  input.value = value.value;
});

const nameClass = computed(() => {
  const classes = [];

  if (input.value) {
    classes.push('switch--checked');
  }

  if (props.disabled) {
    classes.push('switch--disabled');
  }

  return classes.join(' ');
});

const onClick = (): void => {
  if (!props.disabled) {
    input.value = !input.value;
    emit('click', input.value);
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/form/switch.scss";
</style>
