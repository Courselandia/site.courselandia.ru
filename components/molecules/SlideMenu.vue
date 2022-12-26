<template>
  <div class="slide-menu">
    <div
      class="slide-menu__trigger"
      @click="onClick"
      @keyup="onClick"
    >
      <Icon
        name="burger"
        color="blueGrey8"
        :size="[24, 24]"
      />
    </div>
    <transition name="slide-right">
      <template v-if="opened">
        <div class="slide-menu__content">
          <div
            class="slide-menu__close"
            @click="onClick"
            @keyup="onClick"
          >
            <Icon
              name="close"
              color="blueGrey8"
              :size="[20, 20]"
            />
          </div>
          <slot />
        </div>
      </template>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import {
  onDeactivated,
  ref,
  watch,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';

const opened = ref(false);

const onClick = (): void => {
  opened.value = !opened.value;
};

watch(opened, (val): void => {
  if (val) {
    document.body.classList.add('scroll--no-scroll');
  } else {
    document.body.classList.remove('scroll--no-scroll');
  }
});

onDeactivated(() => {
  document.body.classList.remove('scroll--no-scroll');
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/slideMenu.scss";
</style>
