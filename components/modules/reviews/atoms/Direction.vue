<template>
  <Tag
    bck="white"
    :border="active ? 'blue2' : 'grey2'"
    border-hover="blue2"
    color="black"
    cursor
    @click="onClick"
  >
    <slot />
  </Tag>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

import Tag from '@/components/atoms/Tag.vue';

const props = defineProps({
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits({
  click: () => true,
});

const {
  active,
} = toRefs(props);

const onClick = (): void => {
  emit('click');
};
</script>
