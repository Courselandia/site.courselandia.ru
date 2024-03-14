<template>
  <div
    :class="`tab ${active ? 'tab--active' : ''}`"
    @click="onClick"
    @keydown="onClick"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance } from 'vue';

const instance = getCurrentInstance();

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
});

const active = computed((): boolean => instance?.parent?.setupState?.input === props.value);

const onClick = (): void => {
  instance?.parent?.setupState?.onChangeTab(props.value);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/atoms/tab";
</style>
