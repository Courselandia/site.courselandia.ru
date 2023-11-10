<template>
  <div class="reducer">
    <div
      ref="contentRef"
      :class="`reducer__content ${show ? 'reducer__content--show' : 'reducer__content--hide'} ${toReduce ? 'reducer__content--active' : 'reducer__content--no-active'}`"
      :style="{ height: show ? 'auto' : height + 'px' }"
    >
      <div
        ref="textRef"
        class="reducer__text"
      >
        <slot />
      </div>
    </div>
    <template
      v-if="toReduce"
    >
      <div
        v-if="show"
        class="reducer__to_hide"
        @click="onClick(false)"
        @keyup="onClick(false)"
      >
        <div class="reducer__action">
          <template
            v-if="hasSlot('hide')"
          >
            <slot name="hide" />
          </template>
          <template
            v-else
          >
            Сократить
          </template>
        </div>
      </div>
      <div
        v-else
        class="reducer__to_show"
        @click="onClick(true)"
        @keyup="onClick(true)"
      >
        <div class="reducer__action">
          <template
            v-if="hasSlot('show')"
          >
            <slot name="show" />
          </template>
          <template
            v-else
          >
            Читать полностью
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {
  onMounted,
  ref,
  useSlots,
} from 'vue';

const props = defineProps({
  height: {
    type: Number,
    required: false,
    default: 410,
  },
});

const slots = useSlots();
const hasSlot = (name: string) => !!slots[name];
const show = ref(false);
const toReduce = ref(false);
const contentRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);

const onClick = (status: boolean): void => {
  show.value = status;
};

const setToReduce = (): void => {
  if (contentRef.value && textRef.value) {
    const diffHeight = textRef.value.offsetHeight - contentRef.value.offsetHeight;

    toReduce.value = diffHeight > 0;
  }
};

onMounted(() => {
  window.addEventListener('resize', () => {
    setToReduce();
  });

  setToReduce();
});
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/reducer.scss";
</style>
