<template>
  <template
    v-if="field === sortBy"
  >
    <template
      v-if="sortOrder === 'ASC'"
    >
      <Icon
        name="arrow-up"
        color="blue2"
        :size="[12, 12]"
      />
    </template>
    <template
      v-else
    >
      <Icon
        name="arrow-down"
        color="blue2"
        :size="[12, 12]"
      />
    </template>
  </template>
</template>

<script lang="ts" setup>
import type {
  PropType,
} from 'vue';
import {
  toRefs,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import type TSortOrder from '@/types/sortOrder';

const props = defineProps({
  field: {
    type: String,
    required: true,
  },
  sortBy: {
    type: String,
    required: false,
    default: null,
  },
  sortOrder: {
    type: String as PropType<TSortOrder>,
    required: false,
    default: null,
  },
});

const {
  sortBy,
  sortOrder,
} = toRefs(props);
</script>
