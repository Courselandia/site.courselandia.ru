<template>
  <div class="promos">
    <Promocodes
      :promocodes="school.promocodes"
      :school="school.name"
      :logo="school.image_logo_id?.path"
    />
    <Promotions
      :promotions="school.promotions"
      :school="school.name"
      :logo="school.image_logo_id?.path"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import Promocodes from '@/components/modules/promo/molecules/Promocodes.vue';
import Promotions from '@/components/modules/promo/molecules/Promotions.vue';
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
