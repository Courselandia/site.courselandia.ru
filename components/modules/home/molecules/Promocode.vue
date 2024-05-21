<template>
  <div
    class="promocode"
    @click="onClick"
    @keyup="onClick"
  >
    <PromocodeDiscount
      v-if="promocode.discount"
      :discount="promocode.discount"
      :type="promocode.discount_type"
    />
    <PromocodeLabel
      :type="promocode.type"
    />
    <PromocodeLogo
      v-if="promocode.school"
      :image="promocode.school.image_logo_id?.path"
      :label="promocode.school.name"
      :site="promocode.school.site"
    />
    <PromocodePopUp
      v-if="promocode.school"
      v-model:active="active"
      :promocode="promocode"
      :school="promocode.school.name"
      :logo="promocode.school.image_logo_id?.path"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  type PropType,
  ref,
} from 'vue';

import PromocodeDiscount from '@/components/modules/home/atoms/PromocodeDiscount.vue';
import PromocodeLabel from '@/components/modules/home/atoms/PromocodeLabel.vue';
import PromocodeLogo from '@/components/modules/home/atoms/PromocodeLogo.vue';
import PromocodePopUp from '@/components/modules/promo/molecules/PromocodePopUp.vue';
import type IPromocode from '@/interfaces/stores/promo/promocode';

defineProps({
  promocode: {
    type: Object as PropType<IPromocode>,
    required: true,
  },
});

const active = ref(false);

const onClick = (): void => {
  active.value = true;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/home/molecules/promocode";
</style>
