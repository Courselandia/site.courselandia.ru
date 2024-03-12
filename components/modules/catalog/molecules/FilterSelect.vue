<template>
  <div
    :class="`filter-select ${nameClass}`"
  >
    <div class="filter-select__search">
      <Item>
        <Input
          v-model:value="search"
          name="search"
          @focus="onLoadItems"
        >
          <template #before>
            <Icon
              name="loop"
              color="grey3"
              :size="[16, 16]"
            />
          </template>
          <template #after>
            <Icon
              v-if="search"
              name="close"
              color="grey3"
              :size="[16, 16]"
              class="filter-select__close"
              @click="onCLickClean"
            />
          </template>
        </Input>
      </Item>
    </div>
    <div>
      <ClientOnly>
        <Group
          v-model:value="selects"
          class="filter-select__group"
        >
          <VirtualList
            ref="itemsRef"
            class="filter-select__items"
            :data-key="'id'"
            :data-sources="activeItems"
            :data-component="FilterSelectItem"
            :extra-props="{ selects: selects, onClickItem: clickItem }"
          />
        </Group>
      </ClientOnly>
    </div>
    <div
      v-if="!simple"
      :style="{ visibility: activeItems.length >= 10 ? 'visible' : 'hidden' }"
      class="filter-select__more"
      @click="onClickMore"
      @keyup="onClickMore"
    >
      <div>
        {{ more ? 'Скрыть' : 'Показать все' }}
      </div>
      <Icon
        :name="more ? 'angle-up' : 'angle-down'"
        color="blue2"
        :size="[8, 4]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import lodash from 'lodash';
import type {
  PropType,
} from 'vue';
import {
  computed,
  ref,
  toRefs,
  watch,
} from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import VirtualList from 'vue3-virtual-scroll-list';

import Group from '@/components/atoms/form/Group.vue';
import Input from '@/components/atoms/form/Input.vue';
import Item from '@/components/atoms/form/Item.vue';
import Icon from '@/components/atoms/Icon.vue';
import FilterSelectItem from '@/components/modules/catalog/molecules/FilterSelectItem.vue';
import type ICatalogFilterSelectItem from '@/interfaces/components/molecules/catalogFilterSelectItem';

const props = defineProps({
  items: {
    type: Object as PropType<Array<ICatalogFilterSelectItem>>,
    required: false,
    default: null,
  },
  value: {
    type: Object as PropType<Array<ICatalogFilterSelectItem>>,
    required: false,
    default: null,
  },
  simple: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const { isEqual } = lodash;

const {
  value,
} = toRefs(props);

const search = ref('');
const more = ref(false);
const itemsRef = ref<HTMLElement | null>(null);

const nameClass = computed(() => {
  const classes = [];

  if (more.value) {
    classes.push('filter-select--all');
  }

  if (props.simple) {
    classes.push('filter-select--simple');
  }

  return classes.join(' ');
});

const emit = defineEmits({
  'update:value': (_: Array<ICatalogFilterSelectItem>) => true,
  'load-items': (callback?: Function) => true,
  click: (_: Array<ICatalogFilterSelectItem>) => true,
});

const selects = ref<Array<String | Number | Boolean>>(value.value?.map((item) => item.id) || []);

const activeItems = computed((): Array<ICatalogFilterSelectItem> => props.items?.filter(
  (itm) => itm.label?.toLowerCase().indexOf(search.value.toLowerCase().trim()) !== -1 || search.value.trim() === '',
));

const clickItem = (): void => {
  const selected = props.items.filter((itm) => selects.value.indexOf(itm.id) !== -1);
  emit('update:value', selected);
  emit('click', selected);
};

watch(value, () => {
  const newValues = value.value?.map((item) => item.id);

  if (!isEqual(newValues, selects.value)) {
    selects.value = value.value?.map((item) => item.id);
  }
});

const onClickMore = (): void => {
  emit('load-items', () => {
    more.value = !more.value;

    if (!more.value && itemsRef.value) {
      itemsRef.value.scrollTop = 0;
    }
  });
};

const onLoadItems = (): void => {
  emit('load-items', () => {
    more.value = true;
  });
};

const onCLickClean = (): void => {
  search.value = '';
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/filterSelect";
</style>
