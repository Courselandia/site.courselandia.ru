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

<script setup lang="ts">
import {
  type PropType,
  ref,
  toRefs,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';

import Direction from '@/components/modules/reviews/atoms/Direction.vue';
import Tags from '@/components/molecules/Tags.vue';
import EDirection from '@/enums/direction';

const props = defineProps({
  direction: {
    type: Number as PropType<EDirection>,
    required: false,
    default: null,
  },
});

const emit = defineEmits({
  'update:direction': (_: EDirection | null) => true,
});

const {
  direction,
} = toRefs(props);

const route = useRoute();
const directionCurrent = route.query.direction as string;
const directionValue = ref<EDirection | null>(
  Number(directionCurrent) as unknown as EDirection || null,
);

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
@import "@/assets/scss/components/modules/reviews/organism/directions";
</style>
