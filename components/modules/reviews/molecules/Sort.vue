<template>
  <div class="sort">
    <div
      :class="`sort__item ${sortValue.sortBy === 'created_at' ? 'sort__item--active' : ''}`"
      @click="onSort('created_at')"
      @keyup="onSort('created_at')"
    >
      <Icon
        :name="sortValue.sortOrder === 'ASC' ? 'sort-asc' : 'sort-desc'"
        :size="[16, 16]"
        color="black"
        class="sort__icon"
      />
      <div class="sort__field">
        По дате
      </div>
    </div>
    <div
      :class="`sort__item ${sortValue.sortBy === 'rating' ? 'sort__item--active' : ''}`"
      @click="onClick('rating')"
      @keyup="onClick('rating')"
    >
      <Icon
        :name="sortValue.sortOrder === 'ASC' ? 'sort-asc' : 'sort-desc'"
        :size="[16, 16]"
        color="black"
        class="sort__icon"
      />
      <div class="sort__field">
        По оценке
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  type PropType,
  ref,
  toRefs,
  watch,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import type ISorts from '@/interfaces/sorts';

const props = defineProps({
  sort: {
    type: Object as PropType<ISorts>,
    required: false,
    default: null,
  },
});

const emit = defineEmits({
  'update:sort': (_: ISorts | null) => true,
});

const {
  sort,
} = toRefs(props);

const sortValue = ref<ISorts | null>(sort.value);

watch(sortValue, () => {
  emit('update:sort', sortValue.value);
}, {
  deep: true,
});

watch(sort, () => {
  sortValue.value = sort.value;
}, {
  deep: true,
});
</script>
