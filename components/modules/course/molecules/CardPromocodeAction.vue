<template>
  <div class="card-promocode-action">
    <div
      v-if="!showCode"
      class="card-promocode-action__button"
    >
      <Button
        type="secondary"
        wide
        @click="onClick"
      >
        Показать код
      </Button>
    </div>
    <div
      v-else
      class="card-promocode-action__info"
    >
      <CardPromocodePrices
        :course="course"
      />
      <CardPromocodeCodeInfo
        v-if="course.school?.promocode"
        :code="course.school.promocode.code"
        :url="course.school.promocode.url"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type PropType, ref } from 'vue';

import Button from '@/components/atoms/Button.vue';
import CardPromocodeCodeInfo from '@/components/modules/course/molecules/CardPromocodeCodeInfo.vue';
import CardPromocodePrices from '@/components/modules/course/molecules/CardPromocodePrices.vue';
import type ICourse from '@/interfaces/components/modules/course';

defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});

const showCode = ref(false);

const onClick = (): void => {
  showCode.value = true;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/cardPromocodeAction";
</style>
