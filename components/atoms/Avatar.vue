<template>
  <div :class="`avatar ${nameClass}`">
    <template v-if="login">
      <div class="avatar__letter">
        {{ login.slice(0, 1).toUpperCase() }}
      </div>
    </template>
    <template v-else>
      <Icon
        name="avatar"
        color="blueGrey10"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import Icon from '@/components/atoms/Icon.vue';

const props = defineProps({
  hafRound: {
    type: Boolean,
    required: false,
    default: false,
  },
  login: {
    type: String,
    required: false,
    default: null,
  },
});

const nameClass = computed(() => {
  const classes = [];

  if (props.hafRound) {
    classes.push('avatar--haf-round');
  }

  if (props.login) {
    classes.push('avatar--with-letter');
  }

  return classes.join(' ');
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/atoms/avatar.scss";
</style>
