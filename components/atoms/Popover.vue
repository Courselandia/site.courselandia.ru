<template>
  <ClientOnly>
    <div class="popover">
      <div
        ref="reference"
        class="popover__action"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @focusin="onMouseEnter"
        @focusout="onMouseLeave"
      >
        <slot />
      </div>
      <teleport to="body">
        <transition name="fade">
          <div
            v-if="active"
            ref="floating"
            :style="floatingStyles"
            class="popover__content"
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave"
            @focusin="onMouseEnter"
            @focusout="onMouseLeave"
          >
            <div class="popover__box">
              <slot name="content" />
            </div>
            <div
              ref="floatingArrow"
              class="popover__arrow"
              :style="{
                position: 'absolute',
                left:
                  middlewareData.arrow?.x != null
                    ? `${middlewareData.arrow.x}px`
                    : '',
                top:
                  middlewareData.arrow?.y != null
                    ? `${middlewareData.arrow.y}px`
                    : '',
              }"
            />
          </div>
        </transition>
      </teleport>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { arrow, useFloating, offset } from '@floating-ui/vue';
import { ref } from 'vue';

const reference = ref(null);
const floating = ref(null);
const floatingArrow = ref(null);
const active = ref(false);

const { floatingStyles, middlewareData } = useFloating(
  reference,
  floating,
  {
    middleware: [arrow({ element: floatingArrow }), offset(13)],
    placement: 'top',
  },
);

const onMouseEnter = (): void => {
  active.value = true;
};

const onMouseLeave = (): void => {
  active.value = false;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/atoms/popover";
</style>
