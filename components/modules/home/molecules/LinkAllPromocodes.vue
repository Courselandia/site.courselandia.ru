<template>
  <div class="link-all-promocodes">
    <div class="link-all-promocodes__label">
      Более {{ amount }} акций, промокодов и скидок
    </div>
    <Button
      to="/promos"
      link="nuxt-link"
      wide
    >
      Смотреть все
    </Button>
  </div>
</template>

<script lang="ts" setup>
import Button from '@/components/atoms/Button.vue';

defineProps({
  amount: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/home/molecules/linkAllPromocodes";
</style>
