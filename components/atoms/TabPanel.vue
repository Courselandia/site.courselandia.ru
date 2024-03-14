<template>
  <div
    v-if="active"
    class="tab-panel"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
} from 'vue';

const instance = getCurrentInstance();

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
});

const active = computed((): boolean => instance?.parent?.setupState?.input === props.value);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/atoms/tabPanel.scss";
</style>
