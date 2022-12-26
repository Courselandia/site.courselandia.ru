<template>
  <div :class="`short ${nameClass}`">
    <div class="short__text">
      <slot />
    </div>
    <div
      class="short__more"
      @click="onClick"
      @keyup="onClick"
    >
      <div class="short__link">
        Читать полностью
      </div>
      <div class="short__arrow">
        <Icon
          :name="opened ? 'arrow-up' : 'arrow-down'"
          color="blue8"
          :size="[20, 20]"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  ref,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';

const props = defineProps({
  mobile: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const opened = ref(props.mobile === false);

const nameClass = computed(() => {
  const classes = [];

  if (props.mobile) {
    classes.push('short--mobile');
  } else {
    classes.push('short--desktop');
  }

  if (opened.value) {
    classes.push('short--opened');
  }

  return classes.join(' ');
});

const onClick = (): void => {
  opened.value = !opened.value;
};
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/short.scss";
</style>
