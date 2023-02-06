<template>
  <div class="error">
    <div class="error__code">
      {{ code }}
    </div>
    <div class="error__title">
      {{ title }}
    </div>
    <div
      v-if="message"
      class="error__message"
    >
      {{ message }}
    </div>
    <div class="error__action">
      <Button
        to="/"
        link="nuxt-link"
      >
        Вернуться на главную
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from '@/components/atoms/Button.vue';

const props = defineProps({
  code: {
    type: [Number, String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
    default: null,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/error.scss";
</style>
