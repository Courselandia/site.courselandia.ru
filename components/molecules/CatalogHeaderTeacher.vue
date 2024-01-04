<template>
  <div class="catalog-header-teacher mb-12">
    <div
      v-if="teacher.text && !teacher.copied"
      class="catalog-header-teacher__bck"
    >
      <div class="catalog-header-teacher__items content">
        <div class="catalog-header-teacher__item catalog-header-teacher__item--media">
          <div class="catalog-header-teacher__image-wrapper">
            <LazyImage
              v-if="teacher.image_small_id?.path"
              :src="teacher.image_small_id.path"
              class="catalog-header-teacher__image"
              :alt="teacher.name"
              :title="teacher.name"
            />
            <LazyImage
              v-else-if="holder.default"
              :src="holder.default"
              class="catalog-header-teacher__image"
            />
          </div>
          <div class="catalog-header-teacher__socials">
            <template
              v-for="(social, key) in teacher.social_medias"
              :key="key"
            >
              <a
                :href="social.value"
                :class="`catalog-header-teacher__social catalog-header-teacher__social--${social.name}`"
                :title="social.name"
                target="_blank"
                rel="noopener noreferrer nofollow"
              />
            </template>
          </div>
        </div>
        <div class="catalog-header-teacher__item catalog-header-teacher__item--bio">
          <div class="catalog-header-teacher__header">
            <h1 class="catalog-header-teacher__name">
              {{ teacher.header || teacher.name }}
            </h1>
            <div
              v-if="teacher.rating"
              class="catalog-header-teacher__rating"
            >
              Рейтинг: {{ teacher.rating }}
            </div>
          </div>
          <div
            v-if="teacher.city"
            class="catalog-header-teacher__city"
          >
            {{ teacher.city }}
          </div>
          <div class="catalog-header-teacher__info">
            <Reducer>
              <span v-html="teacher.text" />
            </Reducer>
          </div>
          <div
            v-if="teacher.directions.length || teacher.schools.length"
            class="catalog-header-teacher__params"
          >
            <template
              v-if="teacher.directions.length"
            >
              <div
                v-for="(direction, key) in teacher.directions"
                :key="key"
                class="catalog-header-teacher__directions"
              >
                <div class="catalog-header-teacher__direction-label">
                  Направление:
                </div>
                <div class="catalog-header-teacher__direction-items">
                  <nuxt-link
                    :to="`/courses/direction/${direction.link}`"
                    class="catalog-header-teacher__direction-item"
                  >
                    {{ direction.name }}
                  </nuxt-link>
                </div>
              </div>
            </template>
            <template
              v-if="teacher.schools.length"
            >
              <div
                v-for="(school, key) in teacher.schools"
                :key="key"
                class="catalog-header-teacher__schools"
              >
                <div class="catalog-header-teacher__school-label">
                  Школа:
                </div>
                <div class="catalog-header-teacher__school-items">
                  <nuxt-link
                    :to="`/courses/school/${school.link}`"
                    class="catalog-header-teacher__school-item"
                  >
                    {{ school.name }}
                  </nuxt-link>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div
          v-if="teacher.experiences"
          class="catalog-header-teacher__item catalog-header-teacher__item--experience"
        >
          <div class="catalog-header-teacher__experience-label">
            Опыт работы
          </div>

          <div class="catalog-header-teacher__experiences">
            <div
              v-for="(experience, key) in teacher.experiences"
              :key="key"
              class="catalog-header-teacher__experience"
            >
              <div
                v-if="experience.place"
                class="catalog-header-teacher__experience-place"
              >
                {{ experience.place }}
              </div>
              <div
                v-if="experience.position"
                class="catalog-header-teacher__experience-position"
              >
                {{ experience.position }}
              </div>
              <div
                v-if="experience.started || experience.finished"
                class="catalog-header-teacher__experience-period"
              >
                <template
                  v-if="experience.started"
                >
                  {{ dayjs.utc(experience.started).format('DD.MM.YYYY') }}
                </template>
                <template
                  v-if="experience.started && experience.finished"
                >
                  –
                </template>
                <template
                  v-if="experience.finished"
                >
                  {{ dayjs.utc(experience.finished).format('DD.MM.YYYY') }}
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
    >
      <div class="content mt-12">
        <h1 class="title title--1">
          {{ teacher.header || teacher.name }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import type { PropType } from 'vue';

import LazyImage from '@/components/atoms/LazyImage.vue';
import Reducer from '@/components/atoms/Reducer.vue';
import type ITeacherLink from '@/interfaces/stores/course/teacherLink';

const props = defineProps({
  teacher: {
    type: Object as PropType<ITeacherLink>,
    required: true,
  },
});

const holder = await import('@/assets/images/holder.svg');
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/catalogHeaderTeacher.scss";
</style>
