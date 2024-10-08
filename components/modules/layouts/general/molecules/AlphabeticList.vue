<template>
  <div class="alphabetic-list">
    <div
      v-for="(list, letter) in options"
      :key="letter"
      class="alphabetic-list__block"
    >
      <div class="alphabetic-list__letter">
        {{ letter }}
      </div>
      <div class="alphabetic-list__items">
        <nuxt-link
          v-for="(item, key) in list"
          :key="key"
          :to="item.path"
          class="alphabetic-list__item"
          prefetch
          @click="onClick"
        >
          {{ item.label }}
        </nuxt-link>
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

import type IAlphabetic from '@/interfaces/components/modules/layouts/general/molecules/alphabetic';
import type IMenu from '@/interfaces/menu';

const props = defineProps({
  items: {
    type: Array as PropType<Array<IMenu>>,
    required: true,
  },
});

const emit = defineEmits({
  click: () => true,
});

const {
  items,
} = toRefs(props);

const toAlphabetic = (options: Array<IMenu>): IAlphabetic => {
  const result: IAlphabetic = {};

  options.sort((a: IMenu, b: IMenu) => {
    if (a.label < b.label) {
      return -1;
    }

    if (a.label > b.label) {
      return 1;
    }

    return 0;
  });

  options.forEach((option: IMenu) => {
    const index = option.label.slice(0, 1).toUpperCase();

    if (!result[index]) {
      result[index] = [];
    }

    result[index][result[index].length] = option;
  });

  return result;
};

const options = ref(toAlphabetic(items.value));

watch(items, () => {
  options.value = toAlphabetic(items.value);
});

const onClick = (): void => {
  emit('click');
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/layouts/general/molecules/alphabeticList";
</style>
