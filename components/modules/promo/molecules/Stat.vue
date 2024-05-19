<template>
  <div class="stat">
    <div class="stat__icon">
      <slot name="icon" />
    </div>
    <div class="stat__amount">
      <slot name="amount" />
    </div>
    <div class="stat__label">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/molecules/stat";
</style>
