<template>
  <ClientOnly>
    <div
      v-if="activeValue"
      class="popover"
    >
      <div
        class="popover__window"
        :style="{ left: `${left}px` }"
      >
        <div class="popover__box">
          <div
            class="popover__close"
            @click="onClickClose"
            @keyup="onClickClose"
          >
            <div class="popover__close-icon" />
          </div>
          <div class="popover__content">
            <slot />
          </div>
        </div>
      </div>
      <div
        class="popover__dim"
        @click="onClickClose"
        @keyup="onClickClose"
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import {
  ref,
  toRefs,
  watch,
} from 'vue';

const props = defineProps({
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
  left: {
    type: Number,
    required: false,
    default: 0,
  },
});

const emit = defineEmits({
  'update:active': (_: boolean) => true,
});

const { active } = toRefs(props);

const activeValue = ref<boolean>(active.value);

watch(activeValue, () => {
  emit('update:active', activeValue.value);
});

watch(active, () => {
  activeValue.value = active.value;
});

const onClickClose = () => {
  activeValue.value = false;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/atoms/popover";
</style>
