<template>
  <div class="course-box">
    <div class="course-box__content">
      <div class="course-box__header">
        <div class="course-box__side course-box__side--left">
          <CourseBoxImage
            :path="course.image?.path"
          />
          <ClientOnly>
            <div class="course-box__duration-and-lessons-amount-mobile">
              <CourseTileDuration
                v-if="course.duration && course.duration_unit"
                :duration="course.duration"
                :unit="course.duration_unit"
                :point="!!course.lessons_amount"
              />
              <CourseTileLessonsAmount
                v-if="course.lessons_amount"
                :amount="course.lessons_amount"
              />
            </div>
          </ClientOnly>
        </div>
        <div class="course-box__side course-box__side--center">
          <div class="course-box__top">
            <div class="course-box__rating-and-logo">
              <CourseTileBrandLogo
                v-if="course.school?.image"
                :path="course.school?.image"
                :name="course.school.name"
              />
              <CourseTileRating
                v-if="course.rating"
                :rating="course.rating"
              />
            </div>
            <CourseTileName
              :name="course.name"
            />
          </div>
          <div class="course-box__middle">
            <CourseRowText
              v-if="course.text"
              :text="course.text"
            />
          </div>
          <div class="course-box__bottom">
            <CourseTileDuration
              v-if="course.duration && course.duration_unit"
              :duration="course.duration"
              :unit="course.duration_unit"
              :point="!!course.lessons_amount"
            />
            <CourseTileLessonsAmount
              v-if="course.lessons_amount"
              :amount="course.lessons_amount"
            />
          </div>
        </div>
        <div class="course-box__side course-box__side--right">
          <CourseTilePrices
            :price="course.price || undefined"
            :price-recurrent="course.price_recurrent || undefined"
            :price-old="course.price_old || undefined"
            :currency="course.currency || undefined"
          />
          <div
            v-if="course.price || course.price_recurrent || course.price_old"
            class="course-box__promocode"
          >
            <CoursePromocode
              :course="course"
            />
          </div>
          <div class="course-box__actions">
            <div class="course-box__buttons">
              <CourseRowButtonGo
                v-model:active="activeValue"
                :url="course.url"
              />
              <CourseBoxButtonView
                v-model:active="activeValue"
                :link="course.link"
              />
            </div>
            <CourseRowFavorite
              :id="course.id"
            />
          </div>
        </div>
      </div>
      <div class="course-box__body">
        <div class="course-box__info">
          <div
            v-if="course.learns?.length"
            class="course-box__learns"
          >
            <div class="course-box__title">
              Чему вы научитесь
            </div>
            <Learn
              :course="course"
              :columns="1"
            />
          </div>
          <div
            v-if="course.program?.length"
            class="course-box__program"
          >
            <div class="course-box__title">
              Программа курса
            </div>
            <ClientOnly>
              <!--noindex-->
              <div
                v-if="programDescription(course)"
                class="course-box__program-description"
              >
                {{ programDescription(course) }}
              </div>
              <CourseBoxProgram
                :course="course"
              />
              <!--/noindex-->
            </ClientOnly>
          </div>
        </div>
        <div
          v-if="course.tools?.length"
          class="course-box__tools"
        >
          <div class="course-box__title">
            Инструменты
          </div>
          <CourseBoxTools
            :course="course"
          />
        </div>
        <div
          v-if="course.teachers?.length"
          class="course-box__teachers"
        >
          <div class="course-box__title">
            Преподаватели
          </div>
          <CourseBoxTeachers
            :course="course"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  type PropType,
  ref,
  toRefs,
  watch,
} from 'vue';

import CourseBoxButtonView from '@/components/modules/catalog/atoms/CourseBoxButtonView.vue';
import CourseBoxImage from '@/components/modules/catalog/atoms/CourseBoxImage.vue';
import CourseRowButtonGo from '@/components/modules/catalog/atoms/CourseRowButtonGo.vue';
import CourseRowFavorite from '@/components/modules/catalog/atoms/CourseRowFavorite.vue';
import CourseRowText from '@/components/modules/catalog/atoms/CourseRowText.vue';
import CourseTileBrandLogo from '@/components/modules/catalog/atoms/CourseTileBrandLogo.vue';
import CourseTileDuration from '@/components/modules/catalog/atoms/CourseTileDuration.vue';
import CourseTileLessonsAmount from '@/components/modules/catalog/atoms/CourseTileLessonsAmount.vue';
import CourseTileName from '@/components/modules/catalog/atoms/CourseTileName.vue';
import CourseTilePrices from '@/components/modules/catalog/atoms/CourseTilePrices.vue';
import CourseTileRating from '@/components/modules/catalog/atoms/CourseTileRating.vue';
import CourseBoxProgram from '@/components/modules/catalog/molecules/CourseBoxProgram.vue';
import CourseBoxTeachers from '@/components/modules/catalog/molecules/CourseBoxTeachers.vue';
import CourseBoxTools from '@/components/modules/catalog/molecules/CourseBoxTools.vue';
import CoursePromocode from '@/components/modules/catalog/molecules/CoursePromocode.vue';
import Learn from '@/components/modules/course/molecules/Learn.vue';
import type ICourse from '@/interfaces/components/modules/course';
import programDescription from '@/lib/programDescription';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits({
  'update:active': (_: boolean) => true,
});

const {
  active,
} = toRefs(props);

const activeValue = ref<boolean>(active.value);

watch(activeValue, () => {
  emit('update:active', activeValue.value);
});

watch(active, () => {
  activeValue.value = active.value;
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/courseBox";
</style>
