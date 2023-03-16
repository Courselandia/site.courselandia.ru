<template>
  <div class="scroll-loader">
    <slot />
    <div ref="intersectRef" />
  </div>
</template>

<script lang="ts" setup>
import {
  onMounted,
  ref,
} from 'vue';

const intersectRef = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null;

const props = defineProps({
  stop: {
    type: Boolean,
    required: true,
    default: false,
  },
  distance: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits({
  load: () => true,
});

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !props.stop) {
      emit('load');
    }
  }, {
    rootMargin: `0px 0px ${props.distance}px 0px`,
  });

  if (intersectRef.value) {
    observer.observe(intersectRef.value);
  }
});
</script>
