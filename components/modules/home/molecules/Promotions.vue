<template>
  <div
    v-if="promocodes"
    class="promotions"
  >
    <h2 class="title title--big title--center-mobil">
      Акции, промокоды и скидки
    </h2>

    <div class="promotions__promocodes">
      <Promocodes
        :promocodes="promocodes"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { apiReadPromos } from '@/api/promo';
import Promocodes from '@/components/modules/home/molecules/Promocodes.vue';
import type IPromocode from '@/interfaces/stores/promo/promocode';
import type ISchool from '@/interfaces/stores/promo/school';

const getTheBesPromocodes = (
  schools: Array<ISchool> | undefined,
): Array<IPromocode> | undefined => {
  if (schools) {
    let result: Array<IPromocode> = [];

    schools.forEach((school: ISchool) => {
      if (school.promocodes) {
        result = result.concat(school.promocodes);
      }
    });

    result.sort((first: IPromocode, second: IPromocode) => {
      if (!first.discount && !second.discount) {
        return 0;
      }

      if (!first.discount) {
        return -1;
      }

      if (!second.discount) {
        return 1;
      }

      if (first.discount < second.discount) {
        return -1;
      }

      if (first.discount > second.discount) {
        return 1;
      }

      return 0;
    }).slice(0, 11);

    return result;
  }

  return undefined;
};

const promocodes = ref<Array<IPromocode>>();
const response = await apiReadPromos(true);
promocodes.value = getTheBesPromocodes(response?.data);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/home/molecules/promotions";
</style>
