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
          :to="item.link"
          class="alphabetic-list__item"
        >
          {{ item.label }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  PropType,
  toRefs,
  ref,
  watch,
} from 'vue';

import IAlphabetic from '@/interfaces/components/molecules/alphabetic';
import IMenu from '@/interfaces/menu';

const props = defineProps({
  items: {
    type: Array as PropType<Array<IMenu>>,
    required: true,
  },
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
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/alphabeticList.scss";
</style>
