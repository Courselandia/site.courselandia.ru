<template>
  <FilterSelectItemCheckbox
    :value="source.id"
    :label="source.label || ''"
    :disabled="source.disabled && selects?.indexOf(source.id) === -1"
    name="select"
  />
</template>

<script lang="ts" setup>
import type {
  PropType,
} from 'vue';
import {
  provide,
  toRefs,
} from 'vue';

import FilterSelectItemCheckbox from '@/components/modules/catalog/molecules/FilterSelectItemCheckbox.vue';
import type IFilterSelectItem from '@/interfaces/components/modules/catalog/filterSelectItem';

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  source: {
    type: Object as PropType<IFilterSelectItem>,
    required: true,
  },
  selects: {
    type: Array as PropType<Array<String | Number | Boolean>>,
    required: true,
  },
  onClickItem: {
    type: Function,
    required: true,
  },
});

const { selects } = toRefs(props);

provide('selects', selects);
provide('onClickItem', props.onClickItem);
</script>
