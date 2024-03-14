<template>
  <div class="salaries">
    <div class="salaries__header">
      <div class="salaries__side">
        <div class="salaries__title">
          Как быстро окупится обучение
        </div>
        <div class="salaries__separator salaries__separator--top" />
      </div>
      <div class="salaries__info">
        <SalaryExplanation
          :level="professionLevel"
          :name="professionName"
        />
        <SalaryDuration
          :months="months"
        />
      </div>
    </div>
    <div class="salaries__professions">
      <template
        v-for="(profession, keyProfession) in activeProfessions"
        :key="keyProfession"
      >
        <div
          :class="`salaries__profession ${index === keyProfession ? 'salaries__profession--active' : ''}`"
          @mouseenter="onMouseEnter(keyProfession)"
          @mouseleave="onMouseLeave(keyProfession)"
          @focusin="onMouseEnter(keyProfession)"
          @focusout="onMouseLeave(keyProfession)"
          @click="onMouseEnter(keyProfession)"
          @keyup="onMouseEnter(keyProfession)"
        >
          <div class="salaries__name">
            {{ profession.label }}:
            {{ money(getSalary(profession.salaries, ELevel.JUNIOR)) }} ₽ —
            {{ money(getSalary(profession.salaries, ELevel.SENIOR)) }} ₽
          </div>
          <div class="salaries__slider">
            <SliderSalary
              v-if="profession.salaries"
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
          class="salaries__separator salaries__separator--middle"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  PropType,
} from 'vue';
import {
  computed,
  ref,
} from 'vue';

import SalaryDuration from '@/components/modules/course/atoms/SalaryDuration.vue';
import SalaryExplanation from '@/components/modules/course/atoms/SalaryExplanation.vue';
import SliderSalary from '@/components/modules/course/molecules/SliderSalary.vue';
import ELevel from '@/enums/stores/course/level';
import { money } from '@/helpers/number';
import type ICourse from '@/interfaces/components/modules/course';
import type ISalary from '@/interfaces/components/modules/course/salary';
import type IProfession from '@/interfaces/components/modules/profession';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});

const index = ref(0);

const getSalary = (salaries: Array<ISalary>, level: ELevel): number | undefined => {
  for (let i = 0; i < salaries?.length; i++) {
    if (salaries[i].level === level) {
      return salaries[i].salary;
    }
  }

  return undefined;
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

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/salaries";
</style>

<style lang="css">
@import "@vueform/slider/themes/default.css";
</style>
