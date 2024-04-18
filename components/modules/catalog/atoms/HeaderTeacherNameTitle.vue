<template>
  <h1 class="title title--1">
    {{ name }}
  </h1>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>
