<template>
  <div />
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();

await fetch(`${config.public.siteUrl}/__nuxt_multi_cache/purge/all`, {
  method: 'POST',
  headers: {
    'x-nuxt-multi-cache-token': String(config.cacheToken),
  },
});
await $fetch('/api/cache/flush');
</script>
