<template>
  <div class="list">
    <Header
      v-model:sort="sort"
    />
    <Body
      :direction="direction"
      :sort="sortValue"
    />
  </div>
</template>

<script setup lang="ts">
import {
  type PropType,
  ref,
  toRefs,
  watch,
} from 'vue';

import Body from '@/components/modules/reviewSchools/molecules/Body.vue';
import Header from '@/components/modules/reviewSchools/molecules/Header.vue';
import EDirection from '@/enums/direction';
import type ISort from '@/interfaces/sort';

const props = defineProps({
  direction: {
    type: Number as PropType<EDirection>,
    required: false,
    default: null,
  },
  sort: {
    type: Object as PropType<ISort>,
    required: false,
    default: null,
  },
});

const emit = defineEmits({
  'update:sort': (_: ISort | null) => true,
});

const {
  direction,
  sort,
} = toRefs(props);

const sortValue = ref<ISort | null>(null);

watch(sortValue, () => {
  emit('update:sort', sortValue.value);
});

watch(sort, () => {
  sortValue.value = sort.value;
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviewSchools/organism/list";
</style>
