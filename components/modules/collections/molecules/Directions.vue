<template>
  <div class="directions">
    <Tags>
      <Direction
        :active="directionValue === null"
        @click="onClick(null)"
      >
        Все направления
      </Direction>
      <Direction
        :active="directionValue === EDirection.PROGRAMMING"
        @click="onClick(EDirection.PROGRAMMING)"
      >
        Программирование
      </Direction>
      <Direction
        :active="directionValue === EDirection.MARKETING"
        @click="onClick(EDirection.MARKETING)"
      >
        Маркетинг
      </Direction>
      <Direction
        :active="directionValue === EDirection.DESIGN"
        @click="onClick(EDirection.DESIGN)"
      >
        Дизайн
      </Direction>
      <Direction
        :active="directionValue === EDirection.BUSINESS"
        @click="onClick(EDirection.BUSINESS)"
      >
        Бизнес и управление
      </Direction>
      <Direction
        :active="directionValue === EDirection.ANALYTICS"
        @click="onClick(EDirection.ANALYTICS)"
      >
        Аналитика
      </Direction>
      <Direction
        :active="directionValue === EDirection.GAMES"
        @click="onClick(EDirection.GAMES)"
      >
        Игры
      </Direction>
      <Direction
        :active="directionValue === EDirection.OTHER"
        @click="onClick(EDirection.OTHER)"
      >
        Другие профессии
      </Direction>
    </Tags>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import {
  type PropType,
  ref,
  toRefs,
  watch,
} from 'vue';

import Direction from '@/components/modules/collections/atoms/Direction.vue';
import Tags from '@/components/molecules/Tags.vue';
import directionsToMenu from '@/converts/directionsToMenu';
import EDirection from '@/enums/direction';
import type IMenu from '@/interfaces/menu';
import directionStore from '@/stores/direction';

const props = defineProps({
  direction: {
    type: [String, Number] as PropType<EDirection>,
    required: false,
    default: null,
  },
});

const emit = defineEmits({
  'update:direction': (_: EDirection | null) => true,
});

const { directions } = storeToRefs(directionStore());
const listDirections = ref<IMenu[]>();

try {
  listDirections.value = await directionsToMenu(directions.value);
} catch (error: any) {
  console.error(error.message);
}

const {
  direction,
} = toRefs(props);

const directionValue = ref<EDirection | null>(direction.value);

watch(directionValue, () => {
  emit('update:direction', directionValue.value);
});

watch(direction, () => {
  directionValue.value = direction.value;
});

const onClick = (selected: EDirection | null): void => {
  directionValue.value = selected;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/collections/molecules/directions";
</style>
