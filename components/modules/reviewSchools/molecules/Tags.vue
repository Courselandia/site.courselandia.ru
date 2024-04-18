<template>
  <Tags>
    <Tag
      v-if="amountCourses.all"
      :to="`/courses/school/${link}`"
    >
      <Plural
        v-if="amountCourses.all"
        :number="amountCourses.all"
        :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
      />
      от {{ label }}
    </Tag>
    <Tag
      v-if="amountCourses.direction_programming"
      :to="`/courses/school/${link}?filters[direction]=${EDirection.PROGRAMMING}`"
    >
      Программирование
      (<Plural
        v-if="amountCourses.direction_programming"
        :number="amountCourses.direction_programming"
        :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
      />)
    </Tag>
    <Tag
      v-if="amountCourses.direction_marketing"
      :to="`/courses/school/${link}?filters[direction]=${EDirection.MARKETING}`"
    >
      Маркетинг
      (<Plural
        v-if="amountCourses.direction_marketing"
        :number="amountCourses.direction_marketing"
        :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
      />)
    </Tag>
    <Tag
      v-if="amountCourses.direction_design"
      :to="`/courses/school/${link}?filters[direction]=${EDirection.DESIGN}`"
    >
      Дизайн
      (<Plural
        v-if="amountCourses.direction_design"
        :number="amountCourses.direction_design"
        :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
      />)
    </Tag>
    <Tag
      v-if="amountCourses.direction_business"
      :to="`/courses/school/${link}?filters[direction]=${EDirection.BUSINESS}`"
    >
      Бизнес и управление
      (<Plural
        v-if="amountCourses.direction_business"
        :number="amountCourses.direction_business"
        :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
      />)
    </Tag>
    <Tag
      v-if="amountCourses.direction_analytics"
      :to="`/courses/school/${link}?filters[direction]=${EDirection.ANALYTICS}`"
    >
      Аналитика
      (<Plural
        v-if="amountCourses.direction_analytics"
        :number="amountCourses.direction_analytics"
        :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
      />)
    </Tag>
    <Tag
      v-if="amountCourses.direction_games"
      :to="`/courses/school/${link}?filters[direction]=${EDirection.GAMES}`"
    >
      Игры
      (<Plural
        v-if="amountCourses.direction_games"
        :number="amountCourses.direction_games"
        :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
      />)
    </Tag>
    <Tag
      v-if="amountCourses.direction_other"
      :to="`/courses/school/${link}?filters[direction]=${EDirection.OTHER}`"
    >
      Другие профессии
      (<Plural
        v-if="amountCourses.direction_other"
        :number="amountCourses.direction_other"
        :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
      />)
    </Tag>
  </Tags>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import Plural from '@/components/atoms/Plural.vue';
import Tag from '@/components/modules/reviewSchools/atoms/Tag.vue';
import Tags from '@/components/molecules/Tags.vue';
import EDirection from '@/enums/direction';
import type ISchoolAmountCourses from '@/interfaces/stores/school/schoolAmountCourses';

defineProps({
  amountCourses: {
    type: Object as PropType<ISchoolAmountCourses>,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
</script>
