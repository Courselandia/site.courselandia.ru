<template>
  <div class="catalog-filters-mobile">
    <div
      :class="`catalog-filters-mobile__icon ${totalFilters > 0 ? 'catalog-filters-mobile__icon--active' : ''}`"
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
        class="catalog-filters-mobile__total"
      >
        {{ totalFilters }}
      </div>
    </div>
    <transition name="slide-right">
      <div
        v-show="show"
        class="catalog-filters-mobile__content"
      >
        <div class="catalog-filters-mobile__elements">
          <div
            class="catalog-filters-mobile__close"
            @click="onClickClose"
            @keyup="onClickClose"
          >
            <Icon
              name="close"
              color="grey2"
              :size="[24, 24]"
            />
          </div>
          <div class="catalog-filters-mobile__header">
            Фильтры
          </div>
          <div class="catalog-filters-mobile__filters">
            <div id="catalog-filters-mobile" />

            <div class="catalog-filters-mobile__action">
              <Button
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
  onDeactivated,
  ref,
  watch,
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

<style lang="scss">
@import "@/assets/scss/components/molecules/catalogFiltersMobile.scss";
</style>
