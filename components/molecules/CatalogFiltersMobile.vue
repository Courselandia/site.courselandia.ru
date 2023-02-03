<template>
  <div class="catalog-filters-mobile">
    <div
      :class="`catalog-filters-mobile__icon ${show ? 'catalog-filters-mobile__icon--active' : ''}`"
      @click="onClickShow"
      @keyup="onClickShow"
    >
      <Icon
        name="configs"
        :color="show ? 'white' : 'blue2'"
        :size="[20, 20]"
      />
    </div>
    <div
      v-if="show"
      class="catalog-filters-mobile__content"
    >
      <div class="catalog-filters-mobile__elements">
        <div
          class="catalog-filters-mobile__close"
          @click="onClickClose"
          @keyup="onClickClose"
        >
          <Icon
            name="close"
            color="grey2"
            :size="[24, 24]"
          />
        </div>
        <div class="catalog-filters-mobile__header">
          Фильтры
        </div>
        <div class="catalog-filters-mobile__filters">
          <CatalogFilters
            v-model:selected-direction="selectedDirection"
            v-model:selected-rating="selectedRating"
            v-model:selected-schools="selectedSchools"
            v-model:selected-categories="selectedCategories"
            v-model:selected-professions="selectedProfessions"
            v-model:selected-teachers="selectedTeachers"
            v-model:selected-skills="selectedSkills"
            v-model:selected-tools="selectedTools"
            v-model:selected-format="selectedFormat"
            v-model:selected-levels="selectedLevels"
            v-model:selected-prices="selectedPrices"
            v-model:selected-durations="selectedDurations"
            v-model:selected-loan="selectedLoan"
            v-model:selected-free="selectedFree"
            :price-min="priceMin"
            :price-max="priceMax"
            :price-step="priceStep"
            :duration-min="durationMin"
            :duration-max="durationMax"
            :duration-step="durationStep"
            :directions="directions"
            :ratings="ratings"
            :schools="schools"
            :categories="categories"
            :professions="professions"
            :teachers="teachers"
            :skills="skills"
            :tools="tools"
            :formats="formats"
            :levels="levels"
            mobile
            @load-items="onLoadItems"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isEqual } from 'lodash';
import {
  onDeactivated,
  PropType,
  ref,
  toRefs,
  watch,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import CatalogFilters from '@/components/molecules/CatalogFilters.vue';
import ELevel from '@/enums/components/molecules/level';
import ICategory from '@/interfaces/components/molecules/category';
import IDirection from '@/interfaces/components/molecules/direction';
import IFormat from '@/interfaces/components/molecules/format';
import ILevel from '@/interfaces/components/molecules/level';
import IProfession from '@/interfaces/components/molecules/profession';
import IRating from '@/interfaces/components/molecules/rating';
import ISchool from '@/interfaces/components/molecules/schoolFilter';
import ISkill from '@/interfaces/components/molecules/skill';
import ITeacher from '@/interfaces/components/molecules/teacher';
import ITool from '@/interfaces/components/molecules/tool';
import TId from '@/types/id';

const props = defineProps({
  priceMin: {
    type: Number,
    required: false,
    default: 0,
  },
  priceMax: {
    type: Number,
    required: false,
    default: null,
  },
  priceStep: {
    type: Number,
    required: false,
    default: 1000,
  },
  selectedPrices: {
    type: Array as PropType<Array<number>>,
    required: false,
    default: () => [],
  },
  durationMin: {
    type: Number,
    required: false,
    default: 0,
  },
  durationMax: {
    type: Number,
    required: false,
    default: null,
  },
  durationStep: {
    type: Number,
    required: false,
    default: 1,
  },
  selectedDurations: {
    type: Array as PropType<Array<number>>,
    required: false,
    default: () => [],
  },
  directions: {
    type: Array as PropType<Array<IDirection>>,
    required: false,
    default: () => [],
  },
  selectedDirection: {
    type: Object as PropType<IDirection>,
    required: false,
    default: null,
  },
  ratings: {
    type: Array as PropType<Array<IRating>>,
    required: false,
    default: () => [],
  },
  selectedLoan: {
    type: Boolean,
    required: false,
    default: false,
  },
  selectedFree: {
    type: Boolean,
    required: false,
    default: false,
  },
  selectedRating: {
    type: Object as PropType<IRating>,
    required: false,
    default: null,
  },
  schools: {
    type: Array as PropType<Array<ISchool>>,
    required: false,
    default: () => [],
  },
  selectedSchools: {
    type: Array as PropType<Array<ISchool>>,
    required: false,
    default: () => [],
  },
  categories: {
    type: Array as PropType<Array<ICategory>>,
    required: false,
    default: () => [],
  },
  selectedCategories: {
    type: Array as PropType<Array<ICategory>>,
    required: false,
    default: () => [],
  },
  professions: {
    type: Array as PropType<Array<IProfession>>,
    required: false,
    default: () => [],
  },
  selectedProfessions: {
    type: Array as PropType<Array<IProfession>>,
    required: false,
    default: () => [],
  },
  teachers: {
    type: Array as PropType<Array<ITeacher>>,
    required: false,
    default: () => [],
  },
  selectedTeachers: {
    type: Array as PropType<Array<ITeacher>>,
    required: false,
    default: () => [],
  },
  skills: {
    type: Array as PropType<Array<ISkill>>,
    required: false,
    default: () => [],
  },
  selectedSkills: {
    type: Array as PropType<Array<ISkill>>,
    required: false,
    default: () => [],
  },
  tools: {
    type: Array as PropType<Array<ITool>>,
    required: false,
    default: () => [],
  },
  selectedTools: {
    type: Array as PropType<Array<ITool>>,
    required: false,
    default: () => [],
  },
  formats: {
    type: Array as PropType<Array<IFormat>>,
    required: false,
    default: () => [],
  },
  selectedFormat: {
    type: Object as PropType<IFormat>,
    required: false,
    default: null,
  },
  levels: {
    type: Array as PropType<Array<ILevel>>,
    required: false,
    default: () => [],
  },
  selectedLevels: {
    type: Array as PropType<Array<ILevel>>,
    required: false,
    default: () => [],
  },
});

const show = ref(false);

const {
  selectedDirection,
  selectedRating,
  selectedSchools,
  selectedCategories,
  selectedProfessions,
  selectedTeachers,
  selectedSkills,
  selectedTools,
  selectedFormat,
  selectedLevels,
  selectedPrices,
  selectedDurations,
  selectedLoan,
  selectedFree,
} = toRefs(props);

const emit = defineEmits({
  'load-items': (_: string) => true,
  'update:selected-direction': (_: IDirection | null) => true,
  'update:selected-rating': (_: IRating | null) => true,
  'update:selected-schools': (_: Array<ISchool>) => true,
  'update:selected-categories': (_: Array<ICategory>) => true,
  'update:selected-professions': (_: Array<IProfession>) => true,
  'update:selected-teachers': (_: Array<ITeacher>) => true,
  'update:selected-skills': (_: Array<ISkill>) => true,
  'update:selected-tools': (_: Array<ITool>) => true,
  'update:selected-format': (_: IFormat | null) => true,
  'update:selected-levels': (_: Array<ILevel>) => true,
  'update:selected-prices': (_: Array<number>) => true,
  'update:selected-durations': (_: Array<number>) => true,
  'update:selected-loan': (_: Boolean) => true,
  'update:selected-free': (_: Boolean) => true,
});

//

watch(show, () => {
  if (show.value) {
    document.body.classList.add('scroll--no-scroll');
  } else {
    document.body.classList.remove('scroll--no-scroll');
  }
});

onDeactivated(() => {
  document.body.classList.remove('scroll--no-scroll');
});

const onClickClose = (): void => {
  show.value = false;
};

//

const onLoadItems = (name: string): void => {
  emit('load-items', name);
};

//

const selectedDirectionValue = ref<IDirection | null>(selectedDirection.value);

watch(selectedDirectionValue, () => {
  emit('update:selected-direction', selectedDirectionValue.value);
});

watch(selectedDirection, () => {
  selectedDirectionValue.value = selectedDirection.value;
});

//

const selectedRatingValue = ref<TId | null>(selectedRating.value?.value);

watch(selectedRatingValue, () => {
  const selectedRatingValueFound = props.ratings.find(
    (itm) => itm.value === selectedRatingValue.value,
  );

  emit('update:selected-rating', selectedRatingValueFound || null);
});

watch(selectedRating, () => {
  selectedRatingValue.value = selectedRating.value?.value;
});

//

const selectedPricesValue = ref(selectedPrices.value);

watch(selectedPricesValue, () => {
  emit('update:selected-prices', selectedPricesValue.value);
});

watch(selectedPrices, () => {
  selectedPricesValue.value = selectedPrices.value;
});

//

const selectedLoanValue = ref(selectedLoan.value);

watch(selectedLoanValue, () => {
  emit('update:selected-loan', selectedLoanValue.value);
});

watch(selectedLoan, () => {
  selectedLoanValue.value = selectedLoan.value;
});

//

const selectedFreeValue = ref(selectedFree.value);

watch(selectedFreeValue, () => {
  emit('update:selected-free', selectedFreeValue.value);
});

watch(selectedFree, () => {
  selectedFreeValue.value = selectedFree.value;
});

//

const selectedDurationsValue = ref(selectedDurations.value);

watch(selectedDurationsValue, () => {
  emit('update:selected-durations', selectedDurationsValue.value);
});

watch(selectedDurations, () => {
  selectedDurationsValue.value = selectedDurations.value;
});

//

const selectedSchoolsValue = ref(selectedSchools.value);

watch(selectedSchoolsValue, () => {
  emit('update:selected-schools', selectedSchoolsValue.value);
});

watch(selectedSchools, () => {
  selectedSchoolsValue.value = selectedSchools.value;
});

//

const selectedCategoriesValue = ref(selectedCategories.value);

watch(selectedCategoriesValue, () => {
  emit('update:selected-categories', selectedCategoriesValue.value);
});

watch(selectedCategories, () => {
  selectedCategoriesValue.value = selectedCategories.value;
});

//

const selectedProfessionsValue = ref(selectedProfessions.value);

watch(selectedProfessionsValue, () => {
  emit('update:selected-professions', selectedProfessionsValue.value);
});

watch(selectedProfessions, () => {
  selectedProfessionsValue.value = selectedProfessions.value;
});

//

const selectedTeachersValue = ref(selectedTeachers.value);

watch(selectedTeachersValue, () => {
  emit('update:selected-teachers', selectedTeachersValue.value);
});

watch(selectedTeachers, () => {
  selectedTeachersValue.value = selectedTeachers.value;
});

//

const selectedSkillsValue = ref(selectedSkills.value);

watch(selectedSkillsValue, () => {
  emit('update:selected-skills', selectedSkillsValue.value);
});

watch(selectedSkills, () => {
  selectedSkillsValue.value = selectedSkills.value;
});

//

const selectedToolsValue = ref(selectedTools.value);

watch(selectedToolsValue, () => {
  emit('update:selected-tools', selectedToolsValue.value);
});

watch(selectedTools, () => {
  selectedToolsValue.value = selectedTools.value;
});

//

const selectedFormatValue = ref<boolean | null>(selectedFormat.value?.value);

watch(selectedFormatValue, () => {
  const selectedFormatValueFound = props.formats.find(
    (itm) => itm.value === selectedFormatValue.value,
  );

  emit('update:selected-format', selectedFormatValueFound || null);
});

watch(selectedFormat, () => {
  selectedFormatValue.value = selectedFormat.value?.value;
});

//

const selectedLevelsValue = ref<Array<ELevel> | null>(
  selectedLevels.value?.map((itm) => itm.value),
);

watch(selectedLevelsValue, () => {
  const selectedLevelsValueFound = props.levels.filter(
    (itm) => selectedLevelsValue.value?.indexOf(itm.value) !== -1,
  );

  if (selectedLevelsValueFound) {
    emit('update:selected-levels', selectedLevelsValueFound);
  }
}, {
  deep: true,
});

watch(selectedLevels, () => {
  const newValue: Array<ELevel> = selectedLevels.value?.map((itm) => itm.value);

  if (!isEqual(selectedLevelsValue.value, newValue)) {
    selectedLevelsValue.value = newValue;
  }
});

const onClickShow = (): void => {
  show.value = true;
};
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/catalogFiltersMobile.scss";
</style>
