<template>
  <div
    v-if="itemLinkPromo"
    class="promo content mt-12 mb-24 mb-12-sm"
  >
    <div class="promo__side promo__side--left">
      <Back />
      <Header
        :name="itemLinkPromo.name"
      />
      <Promos
        :school="itemLinkPromo"
      />
    </div>
    <div class="promo__side promo__side--right">

    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import Back from '@/components/modules/promo/atoms/Back.vue';
import Header from '@/components/modules/promo/atoms/Header.vue';
import Promos from '@/components/modules/promo/molecules/Promos.vue';
import promo from '@/stores/promo';

const { itemLinkPromo } = storeToRefs(promo());
const title = `Действующие промокоды и акции на курсы от ${itemLinkPromo.value?.name} — Courselandia`;
const description = `Действующие промокоды и акции на курсы ${itemLinkPromo.value?.name}, проверенные и эксклюзивные промокоды от Courselandia! Покупай курс с мегаскидкой скидкой!`;

useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: description,
    },
  ],
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/organism/promo";
</style>
