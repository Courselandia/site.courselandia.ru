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
        :amount="amount"
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
import type TId from '@/types/id';

const getTheBesPromocodes = (
  schools: Array<ISchool> | undefined,
): Array<IPromocode> | undefined => {
  if (schools) {
    let promocodes: Array<IPromocode> = [];
    const limit = 11;

    schools.forEach((school: ISchool) => {
      if (school.promocodes) {
        const items: Array<IPromocode> = [];

        school.promocodes.forEach((value, index) => {
          items[index] = school.promocodes[index];
          items[index].school = school;
        });

        promocodes = promocodes.concat(items);
      }
    });

    promocodes = promocodes.sort((first: IPromocode, second: IPromocode) => {
      if (!first.discount && !second.discount) {
        return 0;
      }

      if (!first.discount) {
        return 1;
      }

      if (!second.discount) {
        return -1;
      }

      if (first.discount < second.discount) {
        return 1;
      }

      if (first.discount > second.discount) {
        return -1;
      }

      return 0;
    });

    let result: Array<IPromocode> = [];

    const getPortion = (
      items: Array<IPromocode>,
      excludes?: Array<IPromocode>,
    ): Array<IPromocode> => {
      const took: Array<TId> = [];

      return items.filter((item: IPromocode) => {
        const isExist = (
          itm: IPromocode,
        ): boolean => !!excludes?.find((exclude: IPromocode) => exclude.id === itm.id);

        if (took.indexOf(item.school_id) === -1 && !isExist(item)) {
          took[took.length] = item.school_id;

          return true;
        }

        return false;
      });
    };

    if (promocodes.length <= limit) {
      return [...result, ...getPortion(promocodes, result)];
    }

    do {
      result = [...result, ...getPortion(promocodes, result)];
    } while (result.length < limit);

    return result.slice(0, limit);
  }

  return undefined;
};

const getAmount = (schools: Array<ISchool> | undefined): number => {
  if (schools) {
    let count = 0;

    schools.forEach((school) => {
      if (school.promocodes?.length) {
        count += school.promocodes.length;
      }

      if (school.promotions?.length) {
        count += school.promotions.length;
      }
    });

    return count;
  }

  return 0;
};

const promocodes = ref<Array<IPromocode>>();
const promos = await apiReadPromos(true);
promocodes.value = getTheBesPromocodes(promos);
const amount = getAmount(promos);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/home/molecules/promotions";
</style>
