<template>
  <Tag
    :border="`${active ? 'blue2' : 'grey2'}`"
    border-hover="blue2"
    color="black"
    :cursor="true"
  >
    <slot />
  </Tag>
</template>

<script lang="ts" setup>
import Tag from '@/components/atoms/Tag.vue';

defineProps({
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
