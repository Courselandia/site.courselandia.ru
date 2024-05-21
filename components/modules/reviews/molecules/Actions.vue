<template>
  <div class="actions">
    <div
      v-if="site"
      class="actions__item"
    >
      <Button
        :to="site as string"
        link="link"
        target="_blank"
        rel="nofollow noopener noreferrer"
        wide
        @click="onClickToSchool"
      >
        Перейти на сайт
      </Button>
    </div>
    <div
      v-if="link"
      class="actions__item"
    >
      <Button
        :to="`/courses/school/${link}`"
        link="nuxt-link"
        wide
        type="secondary"
      >
        Все курсы {{ name }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/atoms/Button.vue';
import track from '@/helpers/track';

defineProps({
  site: {
    type: String,
    required: false,
    default: null,
  },
  link: {
    type: String,
    required: false,
    default: null,
  },
  name: {
    type: String,
    required: false,
    default: null,
  },
});

const onClickToSchool = (): void => {
  track('school');
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviews/molecules/actions";
</style>
