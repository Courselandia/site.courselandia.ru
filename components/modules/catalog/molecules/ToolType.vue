<template>
  <div class="tool-type">
    <div
      class="tool-type__item"
      @click="onCLick(ECourseType.TILE)"
      @keyup="onCLick(ECourseType.TILE)"
    >
      <Icon
        name="tile"
        :color="input === ECourseType.TILE ? 'blue2' : 'black'"
        :size="[16, 16]"
      />
    </div>
    <div
      class="tool-type__item"
      @click="onCLick(ECourseType.ROW)"
      @keyup="onCLick(ECourseType.ROW)"
    >
      <Icon
        name="row"
        :color="input === ECourseType.ROW ? 'blue2' : 'black'"
        :size="[16, 16]"
      />
    </div>
    <div
      class="tool-type__item"
      @click="onCLick(ECourseType.BOX)"
      @keyup="onCLick(ECourseType.BOX)"
    >
      <Icon
        name="box"
        :color="input === ECourseType.BOX ? 'blue2' : 'black'"
        :size="[16, 16]"
      />
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
import ECourseType from '@/enums/components/molecules/courseType';

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

watch(input, () => {
  emit('update:value', input.value);
});

watch(value, () => {
  input.value = value.value;
});

const onCLick = (val: ECourseType): void => {
  input.value = val;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/toolType";
</style>
