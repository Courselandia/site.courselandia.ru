<template>
  <div class="promocode-action">
    <Button
      no-loader
      @click="onClick"
    >
      Открыть промокод
    </Button>
    <PromocodePopUp
      v-model:active="active"
      :promocode="promocode"
      :school="school"
      :logo="logo"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  type PropType,
  ref,
} from 'vue';

import Button from '@/components/atoms/Button.vue';
import PromocodePopUp from '@/components/modules/promo/molecules/PromocodePopUp.vue';
import type IPromocode from '@/interfaces/stores/promo/promocode';

defineProps({
  promocode: {
    type: Object as PropType<IPromocode>,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: false,
    default: null,
  },
});

const active = ref(false);

const onClick = () => {
  active.value = true;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/atoms/promocodeAction";
</style>
