<template>
  <div>
    SECTION!
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: [
    'section',
    'preload-directions',
    'preload-schools',
  ],
  validate: async (route) => route.params.free === 'free' || !route.params.free,
});
</script>
