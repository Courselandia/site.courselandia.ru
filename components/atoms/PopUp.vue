<template>
  <ClientOnly>
    <teleport to="body">
      <div
        v-if="activeValue"
        class="pop-up"
      >
        <div
          class="pop-up__window"
          :style="{ height: `${height}px` }"
        >
          <div class="pop-up__box">
            <div
              class="pop-up__close"
              @click="onClickClose"
              @keyup="onClickClose"
            >
              <div class="pop-up__close-icon" />
            </div>
            <div class="pop-up__content">
              <slot />
            </div>
          </div>
        </div>
        <div
          class="pop-up__dim"
          @click="onClickClose"
          @keyup="onClickClose"
        />
      </div>
    </teleport>
  </ClientOnly>
</template>

<script lang="ts" setup>
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
  height: {
    type: Number,
    required: false,
    default: null,
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
@import "@/assets/scss/components/atoms/popUp";
</style>
