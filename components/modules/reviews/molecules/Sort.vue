<template>
  <div class="sort">
    <div
      :class="`sort__item ${sortsValue.created_at ? 'sort__item--active' : ''}`"
      @click="onSort('created_at', sortsValue.created_at === 'ASC' ? 'DESC' : 'ASC')"
      @keyup="onSort('created_at', sortsValue.created_at === 'ASC' ? 'DESC' : 'ASC')"
    >
      <Icon
        v-if="sortsValue.created_at"
        :name="sortsValue.created_at === 'ASC' ? 'sort-asc' : 'sort-desc'"
        :size="[16, 16]"
        color="black"
        class="sort__icon"
      />
      <div class="sort__field">
        По дате
      </div>
    </div>
    <div
      :class="`sort__item ${sortsValue.rating ? 'sort__item--active' : ''}`"
      @click="onSort('rating', sortsValue.rating === 'ASC' ? 'DESC' : 'ASC')"
      @keyup="onSort('rating', sortsValue.rating === 'ASC' ? 'DESC' : 'ASC')"
    >
      <Icon
        v-if="sortsValue.rating"
        :name="sortsValue.rating === 'ASC' ? 'sort-asc' : 'sort-desc'"
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
    required: true,
  },
});

const emit = defineEmits({
  'update:sorts': (_: ISorts) => true,
});

const {
  sorts,
} = toRefs(props);

const sortsValue = ref<ISorts>(sorts.value);

watch(sortsValue, () => {
  emit('update:sorts', sortsValue.value);
}, {
  deep: true,
});

watch(sorts, () => {
  sortsValue.value = sorts.value;
}, {
  deep: true,
});

const onSort = async (field: string, order: TOrder): Promise<void> => {
  sortsValue.value = {};
  sortsValue.value[field] = order;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviews/molecules/sort";
</style>
