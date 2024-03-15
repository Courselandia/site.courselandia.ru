<template>
  <div class="header">
    {{ header }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  header: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/publications/atoms/header";
</style>
