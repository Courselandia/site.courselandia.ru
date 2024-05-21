<template>
  <div class="promo-pop-up-code">
    <div
      class="promo-pop-up-code__box"
      @click="onClickCopy"
      @keyup="onClickCopy"
    >
      <div class="promo-pop-up-code__code">
        {{ code }}
      </div>
      <div class="promo-pop-up-code__copy">
        <Icon
          :name="copied ? 'checked' : 'copy'"
          color="blue2"
          :size="[26, 26]"
        />
      </div>
    </div>
    <div
      v-if="copiedValue"
      class="promo-pop-up-code__copied"
    >
      Промокод скопирован в буфер обмена
    </div>
  </div>
</template>

<script lang="ts" setup>
import copy from 'copy-to-clipboard';
import {
  ref,
  toRefs,
  watch,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';

const props = defineProps({
  copied: {
    type: Boolean,
    required: true,
  },
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

const { copied } = toRefs(props);
const copiedValue = ref<boolean>(copied.value);

watch(copiedValue, () => {
  emit('update:copied', copiedValue.value);

  if (copiedValue.value) {
    window.setTimeout(() => {
      copiedValue.value = false;
    }, 3000);
  }
});

watch(copied, () => {
  copiedValue.value = copied.value;
});

const onClickCopy = (): void => {
  copy(props.code);
  copiedValue.value = true;

  window.setTimeout(() => {
    window.open(props.url, '_blank')?.focus();
  }, 1000);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/atoms/promoPopUpCode";
</style>
