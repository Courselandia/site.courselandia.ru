<template>
  <div class="header-teacher mb-12">
    <div
      v-if="teacher.text && !teacher.copied"
      class="header-teacher__bck"
    >
      <div class="header-teacher__items content">
        <div class="header-teacher__item header-teacher__item--media">
          <div class="header-teacher__image-wrapper">
            <LazyImage
              v-if="teacher.image_small_id?.path"
              :src="teacher.image_small_id.path"
              class="header-teacher__image"
              :alt="teacher.name"
              :title="teacher.name"
            />
            <LazyImage
              v-else-if="holder.default"
              :src="holder.default"
              class="header-teacher__image"
            />
          </div>
          <div class="header-teacher__socials">
            <template
              v-for="(social, key) in teacher.social_medias"
              :key="key"
            >
              <a
                :href="social.value"
                :class="`header-teacher__social header-teacher__social--${social.name}`"
                :title="social.name"
                target="_blank"
                rel="noopener noreferrer nofollow"
              />
            </template>
          </div>
        </div>
        <div class="header-teacher__item header-teacher__item--bio">
          <div class="header-teacher__header">
            <h1 class="header-teacher__name">
              {{ teacher.header || teacher.name }}
            </h1>
            <div
              v-if="teacher.rating"
              class="header-teacher__rating"
            >
              Рейтинг: {{ teacher.rating }}
            </div>
          </div>
          <div
            v-if="teacher.city"
            class="header-teacher__city"
          >
            {{ teacher.city }}
          </div>
          <div class="header-teacher__info">
            <Reducer>
              <span v-html="teacher.text" />
            </Reducer>
          </div>
          <div
            v-if="teacher.directions.length || teacher.schools.length"
            class="header-teacher__params"
          >
            <template
              v-if="teacher.directions.length"
            >
              <div
                v-for="(direction, key) in teacher.directions"
                :key="key"
                class="header-teacher__directions"
              >
                <div class="header-teacher__direction-label">
                  Направление:
                </div>
                <div class="header-teacher__direction-items">
                  <nuxt-link
                    :to="`/courses/direction/${direction.link}`"
                    class="header-teacher__direction-item"
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
                class="header-teacher__schools"
              >
                <div class="header-teacher__school-label">
                  Школа:
                </div>
                <div class="header-teacher__school-items">
                  <nuxt-link
                    :to="`/courses/school/${school.link}`"
                    class="header-teacher__school-item"
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
          class="header-teacher__item header-teacher__item--experience"
        >
          <div class="header-teacher__experience-label">
            Опыт работы
          </div>

          <div class="header-teacher__experiences">
            <div
              v-for="(experience, key) in teacher.experiences"
              :key="key"
              class="header-teacher__experience"
            >
              <div
                v-if="experience.place"
                class="header-teacher__experience-place"
              >
                {{ experience.place }}
              </div>
              <div
                v-if="experience.position"
                class="header-teacher__experience-position"
              >
                {{ experience.position }}
              </div>
              <div
                v-if="experience.started || experience.finished"
                class="header-teacher__experience-period"
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

const holder = await import('assets/images/holder.svg');
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/headerTeacher";
</style>
