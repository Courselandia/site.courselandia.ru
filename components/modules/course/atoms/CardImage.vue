<template>
  <div class="card-image" :style="`background-image: url('${path ? path : holder?.default}')`">
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  path: {
    type: String,
    required: false,
    default: null,
  },
});

const holder = await import('assets/images/holder.svg');
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/atoms/cardImage";
</style>
