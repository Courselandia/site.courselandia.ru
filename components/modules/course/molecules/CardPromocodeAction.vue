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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type PropType, ref } from 'vue';

import Button from '@/components/atoms/Button.vue';
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
