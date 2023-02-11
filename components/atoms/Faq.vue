<template>
  <div class="faq">
    <div class="faq__question">
      <slot name="question" />
    </div>
    <transition name="fade">
      <div
        v-if="action"
        class="faq__answer"
      >
        <slot name="answer" />
      </div>
    </transition>
    <div
      class="faq__action"
      @click="onClick"
      @keyup="onClick"
    >
      <Icon
        :name="action ? 'minus-circle' : 'plus-circle'"
        color="blue2"
        :size="[32, 32]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import Icon from '@/components/atoms/Icon.vue';

const action = ref(false);

const onClick = (): void => {
  action.value = !action.value;
};
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/faq.scss";
</style>
