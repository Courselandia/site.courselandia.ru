<template>
  {{ number }} {{ word ? word : '' }}
</template>

<script lang="ts" setup>
import {
  computed,
  PropType,
  toRefs,
} from 'vue';

const props = defineProps({
  number: {
    type: Number,
    required: true,
  },
  conditions: {
    type: Object as PropType<Record<string | number, string>>,
    required: true,
  },
});

const {
  number,
  conditions,
} = toRefs(props);

const word = computed<string | null>(() => {
  let max: number = 0;
  let index: string | number | null = null;

  Object.keys(conditions.value)
    .forEach((condition: string | number) => {
      if (condition.toString().indexOf('+') >= 0) {
        const conditionNumber = Number(condition.toString()
          .replace('+', ''));

        if (number.value >= conditionNumber && conditionNumber > max) {
          max = conditionNumber;
          index = condition;
        }
      } else {
        const conditionNumber = Number(condition);

        if (number.value >= conditionNumber && conditionNumber > max) {
          max = conditionNumber;
          index = condition;
        }
      }
    });

  if (index) {
    return conditions.value[index];
  }

  return null;
});
</script>
