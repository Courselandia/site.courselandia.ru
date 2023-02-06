<template>
  <Bubbles class="mb-15">
    <div :class="`catalog-header ${hasSlot('image') ? 'catalog-header--image' : ''}`">
      <div class="content">
        <div class="catalog-header__sides">
          <div class="catalog-header__side catalog-header__side--left">
            <div class="catalog-header__title">
              <h1 class="title title--1">
                <slot name="title" />
              </h1>
              <template v-if="hasSlot('rating') && hasSlot('reviews')">
                <div class="catalog-header__popularity">
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
              </template>
            </div>

            <div class="catalog-header__description">
              <slot name="description" />
            </div>

            <template v-if="hasSlot('teachers')">
              <div class="catalog-header__teachers">
                <div class="catalog-header__teacher_icon">
                  <Icon
                    name="user"
                    color="black"
                    :size="[24, 24]"
                  />
                </div>
                <div class="catalog-header__teacher_label">
                  Преподаватели:
                </div>
                <div class="catalog-header__teacher_amount">
                  <slot name="teachers" />
                </div>
              </div>
            </template>
            <template v-if="hasSlot('action')">
              <div class="catalog-header__action">
                <slot name="action" />
              </div>
            </template>
          </div>
          <div class="catalog-header__side catalog-header__side--right">
            <template v-if="hasSlot('section')">
              <div class="catalog-header__section">
                <slot name="section" />
              </div>
            </template>
            <template v-if="hasSlot('tags')">
              <div class="catalog-header__tags">
                <slot name="tags" />
              </div>
            </template>
            <template v-if="hasSlot('image')">
              <div class="catalog-header__image">
                <slot name="image" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </Bubbles>
</template>

<script lang="ts" setup>
import { useSlots } from 'vue';

import Bubbles from '@/components/atoms/Bubbles.vue';
import Icon from '@/components/atoms/Icon.vue';

const slots = useSlots();

const hasSlot = (name: string) => !!slots[name];
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/catalogHeader.scss";
</style>
