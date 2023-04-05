<template>
  <div class="course-view-salaries">
    <div class="course-view-salaries__header">
      <div class="course-view-salaries__side">
        <div class="course-view-salaries__title">
          Как быстро окупится обучение
        </div>
        <div class="course-view-salaries__separator course-view-salaries__separator--top" />
      </div>
      <div class="course-view-salaries__info">
        <div class="course-view-salaries__explanation">
          На позиции
          <template v-if="professionLevel === ELevel.JUNIOR">
            Junior
          </template>
          <template v-else-if="professionLevel === ELevel.MIDDLE">
            Middle
          </template>
          <template v-else-if="professionLevel === ELevel.SENIOR">
            Senior
          </template>
          {{ professionName }}
          вы заработаете столько же, сколько стоит курс,
        </div>
        <div class="course-view-salaries__duration">
          <template v-if="months">
            за {{ months }}
            <template v-if="months === 1">
              месяц
            </template>
            <template v-else-if="months >= 2 && months <= 4">
              месяца
            </template>
            <template v-else-if="months >= 5">
              месяцев
            </template>
          </template>
        </div>
      </div>
    </div>
    <div class="course-view-salaries__professions">
      <template
        v-for="(profession, keyProfession) in activeProfessions"
        :key="keyProfession"
      >
        <div
          :class="`course-view-salaries__profession ${index === keyProfession ? 'course-view-salaries__profession--active' : ''}`"
          @mouseenter="onMouseEnter(keyProfession)"
          @mouseleave="onMouseLeave(keyProfession)"
          @focusin="onMouseEnter(keyProfession)"
          @focusout="onMouseLeave(keyProfession)"
          @click="onMouseEnter(keyProfession)"
          @keyup="onMouseEnter(keyProfession)"
        >
          <div class="course-view-salaries__name">
            {{ profession.label }}:
            {{ money(getSalary(profession.salaries, ELevel.JUNIOR)) }} ₽ —
            {{ money(getSalary(profession.salaries, ELevel.SENIOR)) }} ₽
          </div>
          <div class="course-view-salaries__slider">
            <SliderSalary
              v-model:value="salaries[index]"
              :junior="getSalary(profession.salaries, ELevel.JUNIOR)"
              :middle="getSalary(profession.salaries, ELevel.MIDDLE)"
              :senior="getSalary(profession.salaries, ELevel.SENIOR)"
              @slide="onMouseEnter(keyProfession)"
            />
          </div>
        </div>
        <div
          v-if="keyProfession !== (activeProfessions.length - 1)"
          class="course-view-salaries__separator course-view-salaries__separator--middle"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  PropType,
  ref,
} from 'vue';

import SliderSalary from '@/components/molecules/SliderSalary.vue';
import ELevel from '@/enums/stores/course/level';
import { money } from '@/helpers/number';
import ICourse from '@/interfaces/components/molecules/course';
import IProfession from '@/interfaces/components/molecules/profession';
import ISalary from '@/interfaces/components/molecules/salary';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});

const index = ref(0);

const getSalary = (salaries: Array<ISalary>, level: ELevel): number | null => {
  for (let i = 0; i < salaries?.length; i++) {
    if (salaries[i].level === level) {
      return salaries[i].salary;
    }
  }

  return null;
};

let activeProfessions: Array<IProfession> = [];

if (props.course.professions) {
  // eslint-disable-next-line vue/max-len
  activeProfessions = Object.values(props.course.professions).filter((profession) => !!(profession.salaries
      && getSalary(profession.salaries, ELevel.JUNIOR)
      && getSalary(profession.salaries, ELevel.MIDDLE)
      && getSalary(profession.salaries, ELevel.SENIOR)));
}

const salaries = ref<Array<number>>([]);

if (activeProfessions.length && activeProfessions[index.value].salaries) {
  for (let i = 0; i < activeProfessions.length; i++) {
    salaries.value[i] = getSalary(
      activeProfessions[i].salaries || [],
      ELevel.JUNIOR,
    ) || 0;
  }
}

const professionName = computed((): string | null => {
  if (activeProfessions.length) {
    return activeProfessions[index.value].label || null;
  }

  return null;
});

const months = computed((): number | null => {
  if (props.course?.price) {
    return Math.ceil(props.course.price / salaries.value[index.value]);
  }

  return null;
});

const professionLevel = computed((): ELevel | null => {
  if (activeProfessions.length && activeProfessions[index.value]) {
    const profession: IProfession = activeProfessions[index.value];

    const salaryJunior = getSalary(profession.salaries || [], ELevel.JUNIOR) || 0;
    const salaryMiddle = getSalary(profession.salaries || [], ELevel.MIDDLE) || 0;
    const salarySenior = getSalary(profession.salaries || [], ELevel.SENIOR) || 0;

    const juniorHalf = (salaryMiddle - salaryJunior) / 2;
    const middleHalf = (salarySenior - salaryMiddle) / 2;

    if (salaries.value[index.value] >= (salaryMiddle + middleHalf)) {
      return ELevel.SENIOR;
    }

    if (
      salaries.value[index.value] >= (salaryMiddle - juniorHalf)
      && salaries.value[index.value] <= (salaryMiddle + middleHalf)
    ) {
      return ELevel.MIDDLE;
    }

    if (
      salaries.value[index.value] >= salaryJunior
      && salaries.value[index.value] <= (salaryJunior + juniorHalf)
    ) {
      return ELevel.JUNIOR;
    }
  }

  return null;
});

const onMouseEnter = (inx: number): void => {
  index.value = inx;
};

const onMouseLeave = (inx: number): void => {
  index.value = inx;
};
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courseViewSalaries.scss";
</style>

<style lang="css">
@import "@vueform/slider/themes/default.css";
</style>
