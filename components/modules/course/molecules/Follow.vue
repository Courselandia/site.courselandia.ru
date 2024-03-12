<template>
  <div class="follow">
    <div class="follow__box">
      <div class="follow__content content">
        <div class="follow__side follow__side--left">
          <FollowName
            :name="course.name"
          />
          <FollowPrices
            :price="course.price"
            :price-recurrent="course.price_recurrent"
            :price-old=" course.price_old"
            :currency="course.currency"
          />
        </div>
        <div class="follow__side follow__side--right">
          <div class="follow__action follow__action--button">
            <Button
              :to="course.url"
              link="link"
              target="_blank"
              rel="nofollow noopener noreferrer"
              @click="onClick"
            >
              Перейти
            </Button>
          </div>
          <div class="follow__action follow__action--favorite">
            <FavoriteCourse
              :id="course.id"
              :mobile="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import Button from '@/components/atoms/Button.vue';
import FavoriteCourse from '@/components/organism/FavoriteCourse.vue';
import currency from '@/helpers/currency';
import { money } from '@/helpers/number';
import track from '@/helpers/track';
import type ICourse from '@/interfaces/components/molecules/course';
import FollowName from '@/components/modules/course/atoms/FollowName.vue';
import FollowPrices from '@/components/modules/course/atoms/FollowPrices.vue';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});

const onClick = (): void => {
  track('school');
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/follow";
</style>
