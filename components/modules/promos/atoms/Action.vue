<template>
  <Button
    link="nuxt-link"
    :to="`/promos/${school.link}`"
    no-loader
  >
    {{ amount }} {{ plural(amount, conditions) }}
  </Button>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import {
  computed,
  toRefs,
} from 'vue';

import Button from '@/components/atoms/Button.vue';
import plural from '@/helpers/plural';
import type ISchool from '@/interfaces/stores/promo/school';

const props = defineProps({
  school: {
    type: Object as PropType<ISchool>,
    required: true,
  },
});

const { school } = toRefs(props);

const amount = computed(() => {
  let count = 0;

  if (school?.value?.promocodes?.length) {
    count += school.value.promocodes.length;
  }

  if (school?.value?.promotions?.length) {
    count += school.value.promotions.length;
  }

  return count;
});

const conditions = {
  0: 'предложений',
  1: 'предложение',
  '2+': 'предложения',
  '5+': 'предложений',
};
</script>
