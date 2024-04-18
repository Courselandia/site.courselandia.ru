<template>
  <Tag
    :to="to"
    bck="blue1"
    cursor
  >
    <slot />
  </Tag>
</template>

<script setup lang="ts">
import Tag from '@/components/atoms/Tag.vue';

defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>
