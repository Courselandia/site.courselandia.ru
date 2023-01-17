<template>
  <div class="slide-menu">
    <div
      class="slide-menu__trigger"
      @click="onClick"
      @keyup="onClick"
    >
      <Icon
        name="burger"
        color="blue2"
        :size="[27, 21]"
      />
    </div>
    <transition name="slide-right">
      <template v-if="showValue">
        <div class="slide-menu__content">
          <slot />
        </div>
      </template>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import {
  onDeactivated,
  ref, toRefs,
  watch,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const {
  show,
} = toRefs(props);

const emit = defineEmits({
  'update:show': (_: Boolean) => true,
});

const showValue = ref(show.value);

watch(showValue, () => {
  emit('update:show', showValue.value);
});

watch(show, () => {
  showValue.value = show.value;

  if (show.value) {
    document.body.classList.add('scroll--no-scroll');
  } else {
    document.body.classList.remove('scroll--no-scroll');
  }
});

const onClick = (): void => {
  showValue.value = !showValue.value;
};

onDeactivated(() => {
  document.body.classList.remove('scroll--no-scroll');
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/slideMenu.scss";
</style>
