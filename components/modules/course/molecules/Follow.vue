<template>
  <div class="follow">
    <div class="follow__box">
      <div class="follow__content content">
        <div class="follow__side follow__side--left">
          <FollowName
            :name="course.name"
          />
          <FollowPrices
            :price="course.price || undefined"
            :price-recurrent="course.price_recurrent || undefined"
            :price-old=" course.price_old || undefined"
            :currency="course.currency || undefined"
          />
        </div>
        <div class="follow__side follow__side--right">
          <FollowActions
            :id="course.id"
            :url="course.url"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import FollowName from '@/components/modules/course/atoms/FollowName.vue';
import FollowPrices from '@/components/modules/course/atoms/FollowPrices.vue';
import FollowActions from '@/components/modules/course/organism/FollowActions.vue';
import type ICourse from '@/interfaces/components/modules/course';

defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/follow";
</style>
