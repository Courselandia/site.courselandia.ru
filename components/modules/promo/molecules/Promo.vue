<template>
  <div>
    HERE!
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import type ISchool from '@/interfaces/stores/promo/school';

defineProps({
  school: {
    type: Object as PropType<ISchool>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/molecules/promo";
</style>
