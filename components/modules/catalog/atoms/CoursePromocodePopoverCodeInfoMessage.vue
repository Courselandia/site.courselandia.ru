<template>
  <div class="course-promocode-popover-code-info-message">
    <div class="course-promocode-popover-code-info-message__icon">
      <Icon
        name="promocode"
        color="yellow"
        :size="[30, 30]"
      />
    </div>
    <div class="course-promocode-popover-code-info-message__text">
      Укажите промокод при оформлении заявки
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/atoms/Icon.vue';
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/coursePromocodePopoverCodeInfoMessage";
</style>
