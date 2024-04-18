<template>
  <Catalog
    class="mb-24 mb-12-sm"
    :section="section"
  />
</template>

<script lang="ts" setup>
import Catalog from '@/components/modules/catalog/organism/Catalog.vue';

defineProps({
  section: {
    type: String,
    required: false,
    default: null,
  },
});
</script>
