<template>
  <div class="sort">
    <div
      :class="`sort__item ${sorts.created_at ? 'sort__item--active' : ''}`"
      @click="onSort('created_at', sorts.created_at === 'ASC' ? 'DESC' : 'ASC')"
      @keyup="onSort('created_at', sorts.created_at === 'ASC' ? 'DESC' : 'ASC')"
    >
      <Icon
        v-if="sorts.created_at"
        :name="sorts.created_at === 'ASC' ? 'sort-asc' : 'sort-desc'"
        :size="[16, 16]"
        color="black"
        class="sort__icon"
      />
      <div class="sort__field">
        По дате
      </div>
    </div>
    <div
      :class="`sort__item ${sorts.rating ? 'sort__item--active' : ''}`"
      @click="onSort('rating', sorts.rating === 'ASC' ? 'DESC' : 'ASC')"
      @keyup="onSort('rating', sorts.rating === 'ASC' ? 'DESC' : 'ASC')"
    >
      <Icon
        v-if="sorts.rating"
        :name="sorts.rating === 'ASC' ? 'sort-asc' : 'sort-desc'"
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
import type { TOrder } from '@/types/order';

const props = defineProps({
  sorts: {
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

const onSort = async (field: string, order: TOrder): Promise<void> => {
  sortValue.value = {};
  sortValue.value[field] = order;
};
</script>
