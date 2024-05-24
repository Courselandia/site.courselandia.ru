<template>
  <div class="card-promocode-code-info-message">
    <div class="card-promocode-code-info-message__icon">
      <Icon
        name="promocode"
        color="yellow"
        :size="[24, 24]"
      />
    </div>
    <div class="card-promocode-code-info-message__text">
      Укажите промокод при оформлении заявки
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/atoms/Icon.vue';
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/atoms/cardPromocodeCodeInfoMessage";
</style>
