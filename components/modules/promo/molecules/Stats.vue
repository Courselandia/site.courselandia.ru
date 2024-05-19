<template>
  <div class="stats">
    <div
      v-if="amountPromocodes"
      class="stats__item"
    >
      <Stat
        :link="school.link"
      >
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
      <Stat
        :link="school.link"
      >
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
      <Stat
        :link="school.link"
      >
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
</template>

<script setup lang="ts">
import {
  computed,
  type PropType,
  toRefs,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import Stat from '@/components/modules/promo/molecules/Stat.vue';
import EType from '@/enums/stores/promo/type';
import plural from '@/helpers/plural';
import type ISchool from '@/interfaces/stores/promo/school';

const props = defineProps({
  school: {
    type: Object as PropType<ISchool>,
    required: true,
  },
});

const { school } = toRefs(props);

const amountPromocodes = computed(() => {
  let count = 0;

  school.value.promocodes.forEach((promocode) => {
    if (promocode.type === EType.DISCOUNT) {
      count++;
    }
  });

  return count;
});

const amountGifts = computed(() => {
  let count = 0;

  school.value.promocodes.forEach((promocode) => {
    if (promocode.type === EType.PRESENT) {
      count++;
    }
  });

  return count;
});

const amountPromotions = computed(() => school.value.promotions.length);

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
@import "@/assets/scss/components/modules/promo/molecules/stats";
</style>
