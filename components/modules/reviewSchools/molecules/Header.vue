<template>
  <div class="header">
    <div class="header__th header__th--school">
      <span
        class="header__sortable"
        @click="onClick('label')"
        @keyup="onClick('label')"
      >
        Школа
      </span>
      <SortDirection
        field="label"
        :sort-by="sortValue.sortBy"
        :sort-order="sortValue.sortOrder as TSortOrder"
      />
    </div>
    <div class="header__th header__th--description">
      Описание
    </div>
    <div class="header__th header__th--courses">
      Курсы
    </div>
    <div class="header__th header__th--rating">
      <span
        class="header__sortable"
        @click="onClick('rating')"
        @keyup="onClick('rating')"
      >
        Рейтинг
      </span>
      <SortDirection
        field="rating"
        :sort-by="sortValue.sortBy"
        :sort-order="sortValue.sortOrder as TSortOrder"
      />
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
import { useRoute } from 'vue-router';

import SortDirection from '@/components/atoms/SortDirection.vue';
import type ISort from '@/interfaces/sort';
import type { TOrder } from '@/types/order';
import type TSortOrder from '@/types/sortOrder';

const props = defineProps({
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
  sort,
} = toRefs(props);

const sortDefault: ISort = {
  sortBy: 'rating',
  sortOrder: 'DESC',
};

const route = useRoute();
const sortByCurrent = route.query.sortBy as string;
const sortOrderCurrent = route.query.sortOrder as string;

const sortValue = ref<ISort>({
  sortBy: sortByCurrent || sortDefault.sortBy,
  sortOrder: sortOrderCurrent as TOrder || sortDefault.sortOrder,
});

watch(sortValue, () => {
  emit('update:sort', sortValue.value);
});

watch(sort, () => {
  sortValue.value = sort.value;
});

const onClick = (field: string): void => {
  if (sortValue.value?.sortBy === field) {
    if (sortValue.value?.sortOrder === 'ASC') {
      sortValue.value.sortOrder = 'DESC';
      sortValue.value.sortBy = field;
    } else {
      sortValue.value.sortOrder = 'ASC';
      sortValue.value.sortBy = field;
    }
  } else {
    sortValue.value = {
      sortOrder: 'ASC',
      sortBy: field,
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviewSchools/molecules/header";
</style>
