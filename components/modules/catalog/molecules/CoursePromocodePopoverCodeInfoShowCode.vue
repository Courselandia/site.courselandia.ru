<template>
  <div class="course-promocode-popover-code-info-show-code">
    <div
      class="course-promocode-popover-code-info-show-code__box"
      @click="onClickCopy"
      @keyup="onClickCopy"
    >
      <div class="course-promocode-popover-code-info-show-code__code">
        {{ code }}
      </div>
      <div class="course-promocode-popover-code-info-show-code__copy">
        <Icon
          :name="copied ? 'checked' : 'copy'"
          color="blue2"
          :size="[26, 26]"
        />
      </div>
    </div>
    <div
      v-if="copied"
      class="course-promocode-popover-code-info-show-code__copied"
    >
      Промокод скопирован в буфер обмена
    </div>
  </div>
</template>

<script lang="ts" setup>
import copy from 'copy-to-clipboard';
import {
  ref,
  watch,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import track from '@/helpers/track';

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const emit = defineEmits({
  'update:copied': (_: boolean) => true,
});

const copied = ref(false);

watch(copied, () => {
  if (copied.value) {
    window.setTimeout(() => {
      copied.value = false;
    }, 3000);
  }
});

const onClickCopy = (): void => {
  copy(props.code);
  copied.value = true;

  window.setTimeout(() => {
    window.open(props.url, '_blank')?.focus();
    track('promo');
  }, 1000);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/molecules/coursePromocodePopoverCodeInfoShowCode";
</style>
