<template>
  <div
    ref="backgroundRef"
    :style="(image || holder) ? `background-image: url('${image || holder}')` : ''"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {
  onMounted,
  ref,
  toRefs,
  watch,
} from 'vue';

const props = defineProps({
  background: {
    type: String,
    required: false,
    default: null,
  },
  holder: {
    type: String,
    required: false,
    default: null,
  },
});

const image = ref('');
const backgroundRef = ref<HTMLElement | null>(null);

const { background } = toRefs(props);

let observer: IntersectionObserver | null;

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && observer) {
      observer.disconnect();
      image.value = background.value;
    }
  });

  if (backgroundRef.value) {
    observer.observe(backgroundRef.value);
  }
});

watch(background, () => {
  if (image.value) {
    image.value = background.value;
  }
});
</script>
