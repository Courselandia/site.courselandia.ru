<template>
  <div class="tags">
    <div
      v-if="amountPromocodes"
      class="tags__item"
    >
      <Tag
        bck="blue1"
        color="black"
      >
        <template #before>
          <Icon
            name="promocode"
            color="blue2"
            :size="[25, 25]"
          />
        </template>
        {{ amountPromocodes }}
        {{ plural(amountPromocodes, promocodeConditions) }}
      </Tag>
    </div>
    <div
      v-if="amountGifts"
      class="tags__item"
    >
      <Tag
        bck="blue1"
        color="black"
      >
        <template #before>
          <Icon
            name="gift"
            color="blue2"
            :size="[25, 25]"
          />
        </template>
        {{ amountGifts }}
        {{ plural(amountGifts, giftConditions) }}
      </Tag>
    </div>
    <div
      v-if="amountPromotions"
      class="tags__item"
    >
      <Tag
        bck="blue1"
        color="black"
      >
        <template #before>
          <Icon
            name="promotion"
            color="blue2"
            :size="[25, 25]"
          />
        </template>
        {{ amountPromotions }}
        {{ plural(amountPromotions, promotionConditions) }}
      </Tag>
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
import Tag from '@/components/atoms/Tag';
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
@import "@/assets/scss/components/modules/promos/molecules/tags";
</style>
