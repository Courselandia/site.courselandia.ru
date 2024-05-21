<template>
  <Button
    wide
    @click="onClick"
  >
    Перейти на сайт школы
  </Button>
</template>

<script lang="ts" setup>
import Button from '@/components/atoms/Button.vue';
import track from '@/helpers/track';

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});

const onClick = (): void => {
  window.open(props.url, '_blank')?.focus();
  track('promo');
};
</script>
