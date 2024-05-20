<template>
  <div class="promo-pop-up-period">
    Действует до {{ dayjs.utc(dateEnd).tz(dayjs.tz.guess()).format('D MMMM YYYY') }} года
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

defineProps({
  dateEnd: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/atoms/promoPopUpPeriod";
</style>
