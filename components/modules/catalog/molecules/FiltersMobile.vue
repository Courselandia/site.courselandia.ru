<template>
  <div class="filters-mobile">
    <div
      :class="`filters-mobile__icon ${totalFilters > 0 ? 'filters-mobile__icon--active' : ''}`"
      @click="onClickShow"
      @keyup="onClickShow"
    >
      <Icon
        name="configs"
        :color="totalFilters > 0 ? 'white' : 'blue2'"
        :size="[20, 20]"
      />
      <div
        v-if="totalFilters"
        class="filters-mobile__total"
      >
        {{ totalFilters }}
      </div>
    </div>
    <transition name="slide-right">
      <div
        v-show="show"
        class="filters-mobile__content"
      >
        <div class="filters-mobile__elements">
          <div
            class="filters-mobile__close"
            @click="onClickClose"
            @keyup="onClickClose"
          >
            <Icon
              name="close"
              color="grey2"
              :size="[24, 24]"
            />
          </div>
          <div class="filters-mobile__header">
            Фильтры
          </div>
          <div class="filters-mobile__filters">
            <div id="catalog-filters-mobile" />

            <div class="filters-mobile__action">
              <Button
                :loading="loading"
                @click="onClickApply"
              >
                Просмотреть {{ total }}
                <template v-if="total === 0">
                  предложений
                </template>
                <template v-else-if="total === 1">
                  предложение
                </template>
                <template v-else-if="total >= 2 && total <= 4">
                  предложения
                </template>
                <template v-else-if="total >= 5">
                  предложений
                </template>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
} from 'vue';

import Button from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';

const props = defineProps({
  total: {
    type: Number,
    required: false,
    default: 0,
  },
  totalFilters: {
    type: Number,
    required: false,
    default: 0,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const show = ref(false);

const onClickClose = (): void => {
  show.value = false;
};

const onClickShow = (): void => {
  show.value = true;
};

const onClickApply = (): void => {
  show.value = false;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/filtersMobile";
</style>
