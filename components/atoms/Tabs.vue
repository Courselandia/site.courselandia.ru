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
import {
  PropType,
  ref,
  toRefs,
  watch,
} from 'vue';

import TValue from '@/types/value';

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
  'update:value': (_: string) => true,
});

const input = ref(value?.value);

watch(input, () => {
  emit('update:value', input.value);
});

watch(value, () => {
  input.value = value.value;
});

const onChangeTab = (val: string): void => {
  input.value = val;
};
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/tabs.scss";
</style>
