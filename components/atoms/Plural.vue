<template>
  <span>
    {{ number }} {{ word ? word : '' }}
  </span>
</template>

<script lang="ts" setup>
import type {
  PropType,
} from 'vue';
import {
  computed,
  toRefs,
} from 'vue';

import plural from '@/helpers/plural';

const props = defineProps({
  number: {
    type: Number,
    required: true,
  },
  conditions: {
    type: Object as PropType<Record<string | number, string>>,
    required: true,
  },
});

const {
  number,
  conditions,
} = toRefs(props);

const word = computed<string | null>(() => {
  return plural(number?.value, conditions.value);
});
</script>
