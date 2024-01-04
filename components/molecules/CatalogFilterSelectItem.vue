<template>
  <CatalogFilterSelectItemCheckbox
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

import CatalogFilterSelectItemCheckbox from '@/components/molecules/CatalogFilterSelectItemCheckbox.vue';
import type ICatalogFilterSelectItem from '@/interfaces/components/molecules/catalogFilterSelectItem';

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  source: {
    type: Object as PropType<ICatalogFilterSelectItem>,
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
