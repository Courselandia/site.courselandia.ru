<template>
  <div class="promos">
    <Promo
      v-for="(school, key) in schools"
      :key="key"
      :school="school"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import Promo from '@/components/modules/promo/molecules/Promo.vue';
import type ISchool from '@/interfaces/stores/promo/school';

defineProps({
  school: {
    type: Object as PropType<ISchool>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/molecules/promos";
</style>
