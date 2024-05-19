<template>
  <div class="populars">
    <div class="populars__title">
      Популярные школы
    </div>
    <div class="populars__schools">
      <Schools
        :exclude="exclude"
      />
    </div>
    <div class="populars__action">
      <Action />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import Action from '@/components/modules/promo/atoms/Action.vue';
import Schools from '@/components/modules/promo/molecules/Schools.vue';
import type ISchool from '@/interfaces/stores/promo/school';

defineProps({
  exclude: {
    type: Object as PropType<ISchool>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/molecules/populars";
</style>
