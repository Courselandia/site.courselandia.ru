<template>
  <div class="rate">
    <div
      v-for="star in goldenStars"
      :key="star"
      :class="`rate__star rate__star--golden rate__star--${star}`"
    />
    <div
      v-for="star in greyStars"
      :key="star"
      :class="`rate__star rate__star--grey rate__star--${star}`"
    />
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
});

const {
  value,
} = toRefs(props);

const goldenStars = Math.round(value.value);
const greyStars = 5 - goldenStars;
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/rate.scss";
</style>
