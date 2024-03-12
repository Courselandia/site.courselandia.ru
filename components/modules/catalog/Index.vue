<template>
  <Catalog
    class="mb-24 mb-12-sm"
    :section="section"
  />
</template>

<script lang="ts" setup>
import Catalog from '@/components/organism/Catalog.vue';

const props = defineProps({
  section: {
    type: String,
    required: false,
    default: null,
  },
});
</script>
