<template>
  <div class="stats">
    <div class="stats__title">
      Доступно предложений {{ amount }}
    </div>
    <div class="stats__items">
      <div
        v-if="amountPromocodes"
        class="stats__item"
      >
        <Stat>
          <template #icon>
            <Icon
              name="promocode"
              color="blue2"
              :size="[25, 25]"
            />
          </template>
          <template #amount>
            {{ amountPromocodes }}
          </template>
          {{ plural(amountPromocodes, promocodeConditions) }}
        </Stat>
      </div>
      <div
        v-if="amountGifts"
        class="stats__item"
      >
        <Stat>
          <template #icon>
            <Icon
              name="gift"
              color="blue2"
              :size="[25, 25]"
            />
          </template>
          <template #amount>
            {{ amountGifts }}
          </template>
          {{ plural(amountGifts, giftConditions) }}
        </Stat>
      </div>
      <div
        v-if="amountPromotions"
        class="stats__item"
      >
        <Stat>
          <template #icon>
            <Icon
              name="promotion"
              color="blue2"
              :size="[25, 25]"
            />
          </template>
          <template #amount>
            {{ amountPromotions }}
          </template>
          {{ plural(amountPromotions, promotionConditions) }}
        </Stat>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import {
  computed,
  toRefs,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import Stat from '@/components/modules/promos/atoms/Stat.vue';
import EType from '@/enums/stores/promo/type';
import plural from '@/helpers/plural';
import type ISchool from '@/interfaces/stores/promo/school';

const props = defineProps({
  schools: {
    type: Array as PropType<Array<ISchool>>,
    required: true,
  },
});

const { schools } = toRefs(props);

const amount = computed(() => {
  let count = 0;

  schools?.value?.forEach((school) => {
    if (school.promocodes?.length) {
      count += school.promocodes.length;
    }

    if (school.promotions?.length) {
      count += school.promotions.length;
    }
  });

  return count;
});

const amountPromocodes = computed(() => {
  let count = 0;

  schools?.value?.forEach((school) => {
    school.promocodes.forEach((promocode) => {
      if (promocode.type === EType.DISCOUNT) {
        count++;
      }
    });
  });

  return count;
});

const amountGifts = computed(() => {
  let count = 0;

  schools?.value?.forEach((school) => {
    school.promocodes.forEach((promocode) => {
      if (promocode.type === EType.PRESENT) {
        count++;
      }
    });
  });

  return count;
});

const amountPromotions = computed(() => {
  let count = 0;

  schools?.value?.forEach((school) => {
    count += school.promotions.length;
  });

  return count;
});

const promocodeConditions = {
  0: 'промокодов',
  1: 'промокод',
  '2+': 'промокода',
  '5+': 'промокодов',
};

const giftConditions = {
  0: 'подарков',
  1: 'подарок',
  '2+': 'подарка',
  '5+': 'подарков',
};

const promotionConditions = {
  0: 'акций',
  1: 'акция',
  '2+': 'акции',
  '5+': 'акций',
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promos/molecules/stats";
</style>
