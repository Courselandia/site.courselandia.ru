<template>
  <div class="tools">
    <div class="tools__side tools__side--left">
      <div class="tools__field tools__field--sort">
        <Item>
          <Select
            v-model:value="sortValue"
            :border="false"
            :options="sorts"
            name="sort"
            @change="onChangeSort"
          />
        </Item>
      </div>
    </div>
    <div class="tools__side tools__side--right">
      <div class="tools__field tools__field--filters-mobile">
        <slot name="filtersMobile" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  PropType,
} from 'vue';
import {
  ref,
  toRefs,
  watch,
} from 'vue';

import Item from '@/components/atoms/form/Item.vue';
import Select from '@/components/atoms/form/Select.vue';
import ECourseSort from '@/enums/components/molecules/courseSort';
import type IOption from '@/interfaces/components/atoms/option';
import type TValue from '@/types/value';

const props = defineProps({
  sort: {
    type: String as PropType<TValue>,
    required: true,
  },
  type: {
    type: String as PropType<TValue>,
    required: true,
  },
});

const {
  sort,
  type,
} = toRefs(props);

const emit = defineEmits({
  'update:sort': (_: TValue) => true,
  'update:type': (_: TValue) => true,
  'change-sort': (_: TValue) => true,
});

const sortValue = ref<TValue>(sort.value);

watch(sortValue, () => {
  emit('update:sort', sortValue.value);
});

watch(sort, () => {
  sortValue.value = sort.value;
});

const sorts: Array<IOption> = [
  {
    value: ECourseSort.ALPHABETIC,
    label: 'По алфавиту',
  },
  {
    value: ECourseSort.DATE,
    label: 'По дате',
  },
  {
    value: ECourseSort.RATING,
    label: 'По рейтингу',
  },
  {
    value: ECourseSort.PRICE_ASC,
    label: 'Цена: по возрастанию',
  },
  {
    value: ECourseSort.PRICE_DESC,
    label: 'Цена: по убыванию',
  },
  {
    value: ECourseSort.RELEVANCY,
    label: 'По релевантности',
  },
];

//

const typeValue = ref<TValue>(type.value);

watch(typeValue, () => {
  emit('update:type', typeValue.value);
});

watch(type, () => {
  typeValue.value = type.value;
});

const onChangeSort = (): void => {
  emit('change-sort', sortValue.value);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/tools";
</style>
