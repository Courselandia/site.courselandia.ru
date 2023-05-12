<template>
  <CatalogFilterSelectItemCheckbox
    :value="source.id"
    :label="source.label || ''"
    :disabled="source.disabled && selects?.indexOf(source.id) === -1"
    name="select"
  />
</template>

<script lang="ts" setup>
import {
  PropType,
  provide,
  toRefs,
} from 'vue';

import CatalogFilterSelectItemCheckbox from '@/components/molecules/CatalogFilterSelectItemCheckbox.vue';
import ICatalogFilterSelectItem from '@/interfaces/components/molecules/catalogFilterSelectItem';

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
});

const { selects } = toRefs(props);

provide('selects', selects);
</script>
