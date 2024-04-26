<template>
  <nuxt-link
    :to="course.link"
    class="course-search-result"
    prefetch
  >
    <div class="course-search-result__media">
      <LazyImage
        v-if="course.image?.path"
        :src="course.image.path"
        class="course-search-result__image"
        :alt="course.name"
        :title="course.name"
      />
      <LazyImage
        v-else-if="holder.default"
        :src="holder.default"
        class="course-search-result__image"
        :alt="course.name"
        :title="course.name"
      />
    </div>
    <div class="course-search-result__info">
      <div
        v-if="course.directions?.length"
        class="course-search-result__direction"
      >
        {{ course.directions[0].name }}
      </div>
      <div
        class="course-search-result__name"
        v-html="course.name"
      />
      <div
        class="course-search-result__prices"
      >
        <div
          v-if="course.price || course.price_recurrent"
          class="course-search-result__price"
        >
          {{ course.price_recurrent
            ? money(course.price_recurrent)
            : money(course.price || 0)
          }}
          <template
            v-if="course.currency"
          >
            {{ currency(course.currency) }}
          </template>
          <template v-if="course.price_recurrent">
            в месяц
          </template>
        </div>
        <div
          v-if="(course.price_recurrent && course.price) || course.price_old"
          class="course-search-result__price_additional"
        >
          <div
            v-if="course.price_recurrent && course.price"
            class="course-search-result__price_current"
          >
            {{ money(course.price) }}
            <template
              v-if="course.currency"
            >
              {{ currency(course.currency) }}
            </template>
          </div>
          <div
            v-if="course.price_old"
            class="course-search-result__price_old"
          >
            {{ money(course.price_old) }}
            <template
              v-if="course.currency"
            >
              {{ currency(course.currency) }}
            </template>
          </div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import LazyImage from '@/components/atoms/LazyImage.vue';
import currency from '@/helpers/currency';
import { money } from '@/helpers/number';
import type ICourse from '@/interfaces/components/modules/course';

defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});

const holder = await import('assets/images/holder.svg');
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/layouts/general/molecules/courseSearchResult";
</style>
