<template>
  <div class="promo-pop-up">
    <PopUp
      v-model:active="activeValue"
    >
      <div class="promo-pop-up__logo">
        <PromoPopUpLogo
          :school="school"
          :logo="logo"
        />
      </div>
      <div class="promo-pop-up__title">
        <PromocodePopUpTitle
          :promocode="promocode"
          :school="school"
        />
      </div>
    </PopUp>
  </div>
</template>

<script lang="ts" setup>
import {
  type PropType,
  ref,
  toRefs,
  watch,
} from 'vue';

import PopUp from '@/components/atoms/PopUp.vue';
import PromocodePopUpTitle from '@/components/modules/promo/atoms/PromocodePopUpTitle.vue';
import PromoPopUpLogo from '@/components/modules/promo/atoms/PromoPopUpLogo.vue';
import type IPromocode from '@/interfaces/stores/promo/promocode';

const props = defineProps({
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
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits({
  'update:active': (_: boolean) => true,
});

const { active } = toRefs(props);

const activeValue = ref<boolean>(active.value);

watch(activeValue, () => {
  emit('update:active', activeValue.value);
});

watch(active, () => {
  activeValue.value = active.value;
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/molecules/promoPopUp";
</style>
