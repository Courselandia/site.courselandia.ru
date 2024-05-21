<template>
  <Button
    wide
    @click="onClick"
  >
    Перейти на сайт школы
  </Button>
</template>

<script lang="ts" setup>
import copy from 'copy-to-clipboard';
import {
  ref,
  toRefs,
  watch,
} from 'vue';

import Button from '@/components/atoms/Button.vue';
import track from '@/helpers/track';

const props = defineProps({
  copied: {
    type: Boolean,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const emit = defineEmits({
  'update:copied': (_: boolean) => true,
});

const { copied } = toRefs(props);
const copiedValue = ref<boolean>(copied.value);

watch(copiedValue, () => {
  emit('update:copied', copiedValue.value);
});

watch(copied, () => {
  copiedValue.value = copied.value;
});

const onClick = (): void => {
  copy(props.code);
  copiedValue.value = true;

  window.open(props.url, '_blank')?.focus();
  track('promo');
};
</script>
