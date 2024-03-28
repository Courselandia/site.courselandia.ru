<template>
  <div />
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();

try {
  await fetch(`${config.public.siteUrl}/__nuxt_multi_cache/purge/all`, {
    method: 'POST',
    headers: {
      'x-nuxt-multi-cache-token': String(config.cacheToken),
    },
  });
} catch (error: any) {
  console.log(`Error occurred in multi cache: ${error.message}`);
}

try {
  await $fetch('/api/cache/flush');
} catch (error: any) {
  console.log(`Error occurred in store cache: ${error.message}`);
}
</script>
