<template>
  <div class="catalog-tools">
    <div class="catalog-tools__side catalog-tools__side--left">
      <div class="catalog-tools__field">
        <Item>
          <Select
            v-model:value="sortValue"
            :border="false"
            :options="sorts"
            name="sort"
          />
        </Item>
      </div>
      <div class="catalog-tools__field">
        <Item>
          <CatalogToolType />
        </Item>
      </div>
    </div>
    <div class="catalog-tools__side catalog-tools__side--right">

    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  PropType,
  ref,
  toRefs,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';

import Item from '@/components/atoms/form/Item.vue';
import Select from '@/components/atoms/form/Select.vue';
import CatalogToolType from '@/components/molecules/CatalogToolType.vue';
import ECourseSort from '@/enums/components/molecules/courseSort';
import ECourseType from '@/enums/components/molecules/courseType';
import IOption from '@/interfaces/components/atoms/option';
import TValue from '@/types/value';

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
});

const route = useRoute();

const sortValue = ref<TValue>(route.query.sort as TValue || ECourseSort.DATE);

watch(sortValue, () => {
  emit('update:sort', sortValue.value);
});

watch(sort, () => {
  sortValue.value = sort.value;
});

const sorts: Array<IOption> = [
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
];

watch(route, (): void => {
  sortValue.value = route.query.sort as TValue || ECourseSort.DATE;
});

//

const typeValue = ref<TValue>(ECourseType.TILE);

watch(typeValue, () => {
  emit('update:type', typeValue.value);
});

watch(type, () => {
  typeValue.value = type.value;
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/catalogTools.scss";
</style>
