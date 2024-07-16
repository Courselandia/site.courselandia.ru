<template>
  <template v-if="image">
    <img
      :src="image"
      :alt="alt"
      :title="title"
      :width="width"
      :height="height"
    />
  </template>
  <template v-else>
    <img
      ref="imageRef"
      src="@/assets/images/px.png"
      :alt="alt"
      :title="title"
      width="1"
      height="1"
    />
  </template>
</template>

<script lang="ts" setup>
import {
  onMounted,
  ref,
  toRefs,
  watch,
} from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: false,
    default: null,
  },
  title: {
    type: String,
    required: false,
    default: null,
  },
  width: {
    type: Number,
    required: false,
    default: null,
  },
  height: {
    type: Number,
    required: false,
    default: null,
  },
});

const image = ref('');
const imageRef = ref<HTMLElement | null>(null);

const { src } = toRefs(props);

let observer: IntersectionObserver | null;

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && observer) {
      observer.disconnect();
      image.value = src.value;
      console.warn('Intersected');
    } else {
      console.warn('No intersection');
    }
  });

  if (imageRef.value) {
    observer.observe(imageRef.value);
  }
});

watch(src, () => {
  if (image.value) {
    image.value = src.value;
  }
});
</script>
