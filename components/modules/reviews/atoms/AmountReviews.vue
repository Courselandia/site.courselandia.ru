<template>
  <div class="amount-reviews">
    <Icon
      name="message"
      :size="[26, 26]"
      color="black"
      class="amount-reviews__icon"
    />
    <div class="amount-reviews__label">
      <Plural
        v-if="count"
        :number="count"
        :conditions="conditions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/atoms/Icon.vue';
import Plural from '@/components/atoms/Plural.vue';

const props = defineProps({
  count: {
    type: Number,
    required: true,
  },
});

const conditions = {
  0: 'отзывов',
  1: 'отзыв',
  '2+': 'отзыва',
  '5+': 'отзывов',
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/modules/reviews/atoms/amountReviews";
</style>
