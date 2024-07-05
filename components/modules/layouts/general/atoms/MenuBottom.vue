<template>
  <div class="menu-bottom">
    <div
      v-for="(item, key) in menuItems"
      :key="key"
      class="menu-bottom__item"
    >
      <nuxt-link
        :to="item.path"
        class="menu-bottom__link"
        prefetch
      >
        {{ item.label }}
      </nuxt-link>
    </div>
    <div
      v-if="hasSlot('more')"
      class="menu-bottom__more"
      @click="onClickMore"
      @keyup="onClickMore"
    >
      <slot
        v-if="limitValue"
        name="more"
      />
      <div
        v-else
      >
        Скрыть
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  type PropType,
  ref,
  toRefs,
  useSlots,
} from 'vue';

import type IMenu from '@/interfaces/menu';

const props = defineProps({
  items: {
    type: Array as PropType<Array<IMenu>>,
    required: true,
  },
  limit: {
    type: Number,
    required: false,
    default: null,
  },
});

const { items, limit } = toRefs(props);
const limitValue = ref(limit.value);
const limitStart = limitValue.value;
const slots = useSlots();
const hasSlot = (name: string) => !!slots[name];

const menuItems = computed(() => {
  if (limitValue.value) {
    return items.value?.slice(0, limitValue.value);
  }

  return items.value;
});

const onClickMore = (): void => {
  limitValue.value = limitValue.value ? 0 : limitStart;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/layouts/general/atoms/menuBottom";
</style>
