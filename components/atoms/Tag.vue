<template>
  <template v-if="to">
    <nuxt-link
      :to="to"
      class="tag"
    >
      <slot />
    </nuxt-link>
  </template>
  <template v-else>
    <div class="tag">
      <slot />
    </div>
  </template>
</template>

<script lang="ts" setup>
const props = defineProps({
  to: {
    type: String,
    required: false,
    default: null,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/tag.scss";
</style>
