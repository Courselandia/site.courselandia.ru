<template>
  <nuxt-link
    :to="`/collections/${collection.link}`"
    class="collection"
    prefetch
  >
    <div class="collection__image">
      <CollectionImage
        :path="collection.image_small_id?.path"
        :name="collection.name"
      />
    </div>
    <div class="collection__info">
      <div class="collection__direction">
        {{ collection.direction.name }}
      </div>
      <div
        :title="collection.name"
        class="collection__name"
      >
        {{ collection.name }}
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import CollectionImage from '@/components/modules/collections/atoms/CollectionImage.vue';
import type ICollection from '@/interfaces/stores/collection/collection';

defineProps({
  collection: {
    type: Object as PropType<ICollection>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/collections/molecules/collection";
</style>
