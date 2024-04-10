<template>
  <div class="tool-type">
    <div class="tool-type__desktop">
      <div
        :class="`tool-type__item ${input === ECourseType.TILE ? 'tool-type__item--active' : ''}`"
        @click="onClick(ECourseType.TILE)"
        @keyup="onClick(ECourseType.TILE)"
      >
        <Icon
          name="tile"
          :color="input === ECourseType.TILE ? 'blue2' : 'black'"
          :size="[16, 16]"
        />
      </div>
      <div
        :class="`tool-type__item ${input === ECourseType.ROW ? 'tool-type__item--active' : ''}`"
        @click="onClick(ECourseType.ROW)"
        @keyup="onClick(ECourseType.ROW)"
      >
        <Icon
          name="row"
          :color="input === ECourseType.ROW ? 'blue2' : 'black'"
          :size="[16, 16]"
        />
      </div>
      <div
        :class="`tool-type__item ${input === ECourseType.BOX ? 'tool-type__item--active' : ''}`"
        @click="onClick(ECourseType.BOX)"
        @keyup="onClick(ECourseType.BOX)"
      >
        <Icon
          name="box"
          :color="input === ECourseType.BOX ? 'blue2' : 'black'"
          :size="[16, 16]"
        />
      </div>
    </div>
    <div class="tool-type__mobile">
      <div
        class="tool-type__item"
        @click="onClickNext"
        @keyup="onClickNext"
      >
        <Icon
          v-if="input === ECourseType.TILE"
          name="tile"
          color="blue2"
          :size="[16, 16]"
        />
        <Icon
          v-else-if="input === ECourseType.ROW"
          name="row"
          color="blue2"
          :size="[16, 16]"
        />
        <Icon
          v-else-if="input === ECourseType.BOX"
          name="box"
          color="blue2"
          :size="[16, 16]"
        />
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

import Icon from '@/components/atoms/Icon.vue';
import ECourseType from '@/enums/components/modules/catalog/courseType';

const props = defineProps({
  value: {
    type: String as PropType<ECourseType>,
    required: true,
  },
});

const {
  value,
} = toRefs(props);

const emit = defineEmits({
  'update:value': (_: ECourseType) => true,
});

const input = ref(value.value);
const typeCookie = useCookie<ECourseType>('catalogTypeCourses');

watch(input, () => {
  emit('update:value', input.value);
});

watch(value, () => {
  input.value = value.value;
});

const onClick = (val: ECourseType): void => {
  input.value = val;
  typeCookie.value = val;
};

const onClickNext = (): void => {
  if (input.value === ECourseType.TILE) {
    input.value = ECourseType.ROW;
    typeCookie.value = ECourseType.ROW;
  } else if (input.value === ECourseType.ROW) {
    input.value = ECourseType.BOX;
    typeCookie.value = ECourseType.BOX;
  } else if (input.value === ECourseType.BOX) {
    input.value = ECourseType.TILE;
    typeCookie.value = ECourseType.TILE;
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/toolType";
</style>
