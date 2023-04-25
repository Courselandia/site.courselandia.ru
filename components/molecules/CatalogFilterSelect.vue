<template>
  <div
    :class="`catalog-filter-select ${nameClass}`"
  >
    <div
      class="catalog-filter-select__search"
    >
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
              class="catalog-filter-select__close"
              @click="onCLickClean"
            />
          </template>
        </Input>
      </Item>
    </div>
    <div
      ref="itemsRef"
      class="catalog-filter-select__items"
    >
      <Group
        v-model:value="selects"
      >
        <Checkbox
          v-for="(item, key) in activeItems"
          :key="key"
          :value="item.id"
          :label="item.label || ''"
          :disabled="item.disabled && selects.indexOf(item.id) === -1"
          name="select"
          @click="onClick"
        />
      </Group>
    </div>
    <div
      v-if="simple === false"
      :style="{ visibility: activeItems.length >= 10 ? 'visible' : 'hidden' }"
      class="catalog-filter-select__more"
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
import {
  computed,
  PropType,
  ref,
  toRefs,
  watch,
} from 'vue';

import Checkbox from '@/components/atoms/form/Checkbox.vue';
import Group from '@/components/atoms/form/Group.vue';
import Input from '@/components/atoms/form/Input.vue';
import Item from '@/components/atoms/form/Item.vue';
import Icon from '@/components/atoms/Icon.vue';
import ICatalogFilterSelectItem from '@/interfaces/components/molecules/catalogFilterSelectItem';

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
    classes.push('catalog-filter-select--all');
  }

  if (props.simple) {
    classes.push('catalog-filter-select--simple');
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

watch(selects, () => {
  const selected = props.items.filter((itm) => selects.value.indexOf(itm.id) !== -1);

  emit('update:value', selected);
}, {
  deep: true,
});

watch(value, () => {
  const newValues = value.value?.map((item) => item.id);

  if (!isEqual(newValues, selects.value)) {
    selects.value = value.value?.map((item) => item.id);
  }
});

const onClick = (): void => {
  const selected = props.items.filter((itm) => selects.value.indexOf(itm.id) !== -1);

  emit('click', selected);
};

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

<style lang="scss">
@import "assets/scss/components/molecules/catalogFilterSelect.scss";
</style>
