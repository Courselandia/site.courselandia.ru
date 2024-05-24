<template>
  <div
    v-if="course.currency"
    class="card-promocode-prices"
  >
    <CoursePromocodePopoverPrice
      v-if="course.price_old"
    >
      Цена курса в школе
      <template #value>
        {{ money(course.price_old) }} {{ getCurrency(course.currency) }}
      </template>
    </CoursePromocodePopoverPrice>
    <CoursePromocodePopoverPrice
      v-if="!course.price_old && course.price"
    >
      Цена курса в школе
      <template #value>
        {{ money(course.price) }} {{ getCurrency(course.currency) }}
      </template>
    </CoursePromocodePopoverPrice>
    <CoursePromocodePopoverPrice
      v-if="course.price_old && course.price && course.price_old !== course.price"
    >
      Цена со скидкой от школы -{{ 100 - Math.round(course.price * 100 / course.price_old) }}%
      <template #value>
        {{ money(course.price) }} {{ getCurrency(course.currency) }}
      </template>
    </CoursePromocodePopoverPrice>
    <CoursePromocodePopoverPrice
      v-if="course.price && course.school?.promocode?.discount"
      blue
    >
      Промокод от нас
      <template
        v-if="course.school.promocode.discount_type === EDiscountType.PERCENT"
      >
        -{{ course.school.promocode.discount }}%
      </template>
      <template
        v-else
      >
        -{{ money(course.school.promocode.discount) }} {{ getCurrency(course.currency) }}
      </template>
      <template #value>
        <template
          v-if="course.school.promocode.discount_type === EDiscountType.PERCENT"
        >
          {{ money(Math.round(course.price * course.school.promocode.discount / 100)) }}
        </template>
        <template
          v-else
        >
          {{ money(course.school.promocode.discount) }}
        </template>

        {{ getCurrency(course.currency) }}
      </template>
    </CoursePromocodePopoverPrice>
    <CoursePromocodePopoverPrice
      v-if="course.price && course.school?.promocode?.discount"
      big
    >
      Итого
      <template #value>
        <template
          v-if="course.school.promocode.discount_type === EDiscountType.PERCENT"
        >
          {{ money(
            Math.round(course.price - (course.price * course.school.promocode.discount / 100)),
          ) }}
        </template>
        <template
          v-else
        >
          {{ money(course.price - course.school.promocode.discount) }}
        </template>

        {{ getCurrency(course.currency) }}
      </template>
    </CoursePromocodePopoverPrice>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import CoursePromocodePopoverPrice from '@/components/modules/course/atoms/CardPromocodePrice.vue';
import EDiscountType from '@/enums/stores/promo/discountType';
import getCurrency from '@/helpers/currency';
import { money } from '@/helpers/number';
import type ICourse from '@/interfaces/components/modules/course';

defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/cardPromocodePrices";
</style>