<template>
  <div class="info-block">
    <div class="info-block__title">
      <slot name="title" />
    </div>
    <div class="info-block__value">
      <slot name="value" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/atoms/infoBlock";
</style>
