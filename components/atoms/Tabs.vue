<template>
  <div class="tabs">
    <div class="tabs__tab-list">
      <slot name="tabs" />
    </div>
    <div class="tabs__tab-panel-list">
      <slot name="panels" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  PropType,
} from 'vue';
import {
  ref,
  toRefs,
  watch,
} from 'vue';

import type TValue from '@/types/value';

const props = defineProps({
  value: {
    type: String as PropType<TValue>,
    required: true,
  },
});

const {
  value,
} = toRefs(props);

const emit = defineEmits({
  'update:value': (_: TValue) => true,
});

const input = ref(value?.value);

watch(input, () => {
  emit('update:value', input.value);
});

watch(value, () => {
  input.value = value.value;
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/atoms/tabs";
</style>
