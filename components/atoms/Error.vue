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
    <div
      v-if="config.public.development && error || stack"
      class="error__dev"
    >
      <div
        v-if="error"
        class="error__error"
      >
        {{ error }}
      </div>
      <div
        v-if="stack"
        class="error__stack"
        v-html="stack"
      />
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

defineProps({
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
  stack: {
    type: String,
    required: false,
    default: null,
  },
  error: {
    type: String,
    required: false,
    default: null,
  },
});

const config = useRuntimeConfig();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/atoms/error";
</style>
