<template>
  <div class="group">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  toRefs,
  watch,
} from 'vue';

const props = defineProps({
  value: {
    type: [String, Number, Array<String | Number>],
    required: false,
    default: null,
  },
});

const {
  value,
} = toRefs(props);

const input = ref(value.value);

const emit = defineEmits({
  'update:value': (_: String | Number | Array<String | Number>) => true,
});

watch(input, () => {
  emit('update:value', input.value);
});

watch(value, () => {
  input.value = value.value;
});

const onChangeValue = (val: string | number): void => {
  if (Array.isArray(input.value)) {
    if (input.value.indexOf(val) !== -1) {
      const index = input.value?.indexOf(val);

      if (index > -1) {
        input.value.splice(index, 1);
      }
    } else {
      console.log('HERE 2')
      input.value?.push(val);
    }
  } else {
    input.value = val;
  }
};

defineExpose({
  onChangeValue,
  input,
});
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/form/group.scss";
</style>
