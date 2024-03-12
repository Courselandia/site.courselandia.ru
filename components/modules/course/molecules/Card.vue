<template>
  <div
    :class="`card ${props.scroll ? 'card--scroll' : ''}`"
  >
    <div
      id="course-card"
      :class="`card__box ${props.scroll ? 'card__box--scroll' : ''}`"
    >
      <CardImage
        :image="course.image?.path"
      >
        <CardRating
          v-if="course.rating"
          :rating="course.rating"
        />
        <CardBrandLogo
          v-if="course.school?.image"
          :path="course.school.image"
          :name="course.school.name"
        />
      </CardImage>
      <div class="card__content">
        <CardName
          :name="course.name"
        />
        <CardPrices
          :price="course.price"
          :price-recurrent="course.price_recurrent"
          :price-old="course.price_old"
          :currency="course.currency"
        />
      </div>
      <div class="card__footer">
        <CardActions
          :id="course.id"
          :url="course.url"
        />
        <CardFeatures
          v-if="course.features?.length"
          :features="course.features"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  PropType,
} from 'vue';

import CardActions from '@/components/modules/course/atoms/CardActions.vue';
import CardBrandLogo from '@/components/modules/course/atoms/CardBrandLogo.vue';
import CardImage from '@/components/modules/course/atoms/CardImage.vue';
import CardName from '@/components/modules/course/atoms/CardName.vue';
import CardPrices from '@/components/modules/course/atoms/CardPrices.vue';
import CardRating from '@/components/modules/course/atoms/CardRating.vue';
import CardFeatures from '@/components/modules/course/molecules/CardFeatures.vue';
import type ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
  scroll: {
    type: Boolean,
    required: false,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/card";
</style>
