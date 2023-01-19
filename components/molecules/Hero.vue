<template>
  <div class="hero">
    <div class="hero__info">
      <div class="hero__title">
        <slot name="title" />
      </div>
      <div class="hero__description">
        <slot name="description" />
      </div>
      <div class="hero__tags">
        <slot name="tags" />
      </div>
      <div class="hero__actions">
        <slot name="actions" />
      </div>
    </div>
    <div class="hero__media">
      <slot name="media" />
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/components/molecules/hero.scss";
</style>
