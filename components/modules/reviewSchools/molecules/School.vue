<template>
  <div class="school">
    <div class="school__group">
      <div class="school__td school__td--school">
        <LazyImage
          v-if="school.image"
          :src="school.image"
          :alt="school.label"
          :title="school.label"
          class="school__logo"
        />
        <template
          v-else
        >
          {{ school.label }}
        </template>
      </div>
      <div class="school__td school__td--description">
        <div
          class="school__text"
          v-html="school.text"
        />
        <a
          v-if="school.site"
          :href="school.site"
          class="link school__site"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ school.site.replace(/^https?:\/\//, '') }}
        </a>
      </div>
    </div>
    <div class="school__group">
      <div class="school__td school__td--courses">
        <Tags
          v-if="school.amount_courses.all"
        >
          <Tag
            v-if="school.amount_courses.all"
            :to="`/courses/school/${school.link}`"
            bck="blue1"
            cursor
          >
            <Plural
              v-if="school.amount_courses.all"
              :number="school.amount_courses.all"
              :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
            />
            от {{ school.label }}
          </Tag>
          <Tag
            v-if="school.amount_courses.direction_programming"
            :to="`/courses/school/${school.link}?filters[direction]=${EDirection.PROGRAMMING}`"
            bck="blue1"
            cursor
          >
            Программирование
            (<Plural
              v-if="school.amount_courses.direction_programming"
              :number="school.amount_courses.direction_programming"
              :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
            />)
          </Tag>
          <Tag
            v-if="school.amount_courses.direction_marketing"
            :to="`/courses/school/${school.link}?filters[direction]=${EDirection.MARKETING}`"
            bck="blue1"
            cursor
          >
            Маркетинг
            (<Plural
              v-if="school.amount_courses.direction_marketing"
              :number="school.amount_courses.direction_marketing"
              :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
            />)
          </Tag>
          <Tag
            v-if="school.amount_courses.direction_design"
            :to="`/courses/school/${school.link}?filters[direction]=${EDirection.DESIGN}`"
            bck="blue1"
            cursor
          >
            Дизайн
            (<Plural
              v-if="school.amount_courses.direction_design"
              :number="school.amount_courses.direction_design"
              :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
            />)
          </Tag>
          <Tag
            v-if="school.amount_courses.direction_business"
            :to="`/courses/school/${school.link}?filters[direction]=${EDirection.BUSINESS}`"
            bck="blue1"
            cursor
          >
            Бизнес и управление
            (<Plural
              v-if="school.amount_courses.direction_business"
              :number="school.amount_courses.direction_business"
              :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
            />)
          </Tag>
          <Tag
            v-if="school.amount_courses.direction_analytics"
            :to="`/courses/school/${school.link}?filters[direction]=${EDirection.ANALYTICS}`"
            bck="blue1"
            cursor
          >
            Аналитика
            (<Plural
              v-if="school.amount_courses.direction_analytics"
              :number="school.amount_courses.direction_analytics"
              :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
            />)
          </Tag>
          <Tag
            v-if="school.amount_courses.direction_games"
            :to="`/courses/school/${school.link}?filters[direction]=${EDirection.GAMES}`"
            bck="blue1"
            cursor
          >
            Игры
            (<Plural
              v-if="school.amount_courses.direction_games"
              :number="school.amount_courses.direction_games"
              :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
            />)
          </Tag>
          <Tag
            v-if="school.amount_courses.direction_other"
            :to="`/courses/school/${school.link}?filters[direction]=${EDirection.OTHER}`"
            bck="blue1"
            cursor
          >
            Другие профессии
            (<Plural
              v-if="school.amount_courses.direction_other"
              :number="school.amount_courses.direction_other"
              :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
            />)
          </Tag>
        </Tags>
      </div>
      <div class="school__td school__td--rating">
        <div class="school__school">
          <div class="school__content-rating">
            <div class="school__rating">
              <div class="school__rating-value">
                {{ Math.round(school.rating * 100) / 100 }}
              </div>
              <div class="school__rating-star">
                <Icon
                  name="star"
                  color="blue2"
                  :size="[30, 30]"
                  class="school__rating-star-icon"
                />
              </div>
            </div>
          </div>
          <div class="school__to-school">
            <Button
              :to="`/reviews/${school.link}`"
            >
              {{ school.reviews }}
              <template v-if="school.reviews === 0 || school.reviews >= 5">
                отзывов
              </template>
              <template v-else-if="school.reviews === 1">
                отзыв
              </template>
              <template v-else-if="school.reviews >= 2 || school.reviews >= 4">
                отзыва
              </template>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import Button from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';
import LazyImage from '@/components/atoms/LazyImage.vue';
import Plural from '@/components/atoms/Plural.vue';
import Tag from '@/components/atoms/Tag.vue';
import Tags from '@/components/molecules/Tags.vue';
import EDirection from '@/enums/direction';
import type IListSchoolReview from '@/interfaces/components/molecules/listSchoolReview';

const props = defineProps({
  school: {
    type: Object as PropType<IListSchoolReview>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviewSchools/molecules/school";
</style>
