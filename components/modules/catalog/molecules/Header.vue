<template>
  <Bubbles class="mb-12">
    <div :class="`header ${hasSlot('image') ? 'header--image' : ''}`">
      <div class="content">
        <div class="header__sides">
          <div class="header__side header__side--left">
            <div class="header__title">
              <h1 class="title title--1">
                <slot name="title" />
              </h1>
              <template v-if="hasSlot('rating')">
                <div class="header__popularity">
                  <div class="header__rating">
                    <div class="header__rating_amount">
                      <slot name="rating" />
                    </div>
                    <div class="header__star">
                      <Icon
                        name="star"
                        color="blue2"
                        :size="[33, 33]"
                      />
                    </div>
                  </div>
                  <div
                    v-if="hasSlot('reviews')"
                    class="header__reviews"
                  >
                    <slot name="reviews" />
                  </div>
                </div>
              </template>
            </div>

            <div
              v-if="hasSlot('description')"
              class="header__description"
            >
              <slot name="description" />
            </div>

            <template v-if="hasSlot('teachers')">
              <div class="header__teachers">
                <div class="header__teacher_icon">
                  <Icon
                    name="user"
                    color="black"
                    :size="[24, 24]"
                  />
                </div>
                <div class="header__teacher_label">
                  Преподаватели:
                </div>
                <div class="header__teacher_amount">
                  <slot name="teachers" />
                </div>
              </div>
            </template>
            <template v-if="hasSlot('action')">
              <div class="header__action">
                <slot name="action" />
              </div>
            </template>
          </div>
          <div class="header__side header__side--right">
            <template v-if="hasSlot('section')">
              <div class="header__section">
                <slot name="section" />
              </div>
            </template>
            <template v-if="hasSlot('tags')">
              <div class="header__tags">
                <slot name="tags" />
              </div>
            </template>
            <template v-if="hasSlot('image')">
              <div class="header__image">
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

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/header";
</style>
