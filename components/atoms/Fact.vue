<template>
  <div class="fact">
    <div class="fact__title">
      <slot name="title" />
    </div>
    <div class="fact__value">
      <slot name="value" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/components/atoms/fact.scss";
</style>
