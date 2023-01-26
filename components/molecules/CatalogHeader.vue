<template>
  <div class="catalog-header">
    <div class="content">
      <div class="catalog-header__sides">
        <div class="catalog-header__side catalog-header__side--left">
          <div class="catalog-header__title">
            <h1 class="title title--1">
              <slot name="title" />
            </h1>
            <div
              :class="`catalog-header__popularity ${(!hasSlot('rating') && !hasSlot('reviews')) ? 'catalog-header__empty' : ''}`"
            >
              <div class="catalog-header__rating">
                <div class="catalog-header__rating_amount">
                  <slot name="rating" />
                </div>
                <div class="catalog-header__star">
                  <Icon
                    name="star"
                    color="blue2"
                    :size="[33, 33]"
                  />
                </div>
              </div>
              <div class="catalog-header__reviews">
                <slot name="reviews" />
              </div>
            </div>
          </div>

          <div class="catalog-header__description">
            <slot name="description" />
          </div>
        </div>
        <div class="catalog-header__side catalog-header__side--right">
          <div
            :class="`catalog-header__section ${!hasSlot('section') ? 'catalog-header__empty' : ''}`"
          >
            <slot name="section" />
          </div>
          <div
            :class="`catalog-header__tags ${!hasSlot('tags') ? 'catalog-header__empty' : ''}`"
          >
            <slot name="tags" />
          </div>
          <div
            :class="`catalog-header__image ${!hasSlot('image') ? 'catalog-header__empty' : ''}`"
          >
            <slot name="image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSlots } from 'vue';

import Icon from '@/components/atoms/Icon.vue';

const slots = useSlots();

const hasSlot = (name: string) => {
  return !!slots[name];
};
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/catalogHeader.scss";
</style>
