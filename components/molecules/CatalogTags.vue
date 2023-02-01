<template>
  <div>
    {{ selectedSchoolsValue }}
  </div>
  <div
    v-if="selectedDirectionValue
      || selectedRatingValue
      || (selectedPricesValue[0] !== priceMin || selectedPricesValue[1] !== priceMax)
      || selectedLoanValue
      || selectedFreeValue
      || (selectedDurationsValue[0] !== durationMin || selectedDurationsValue[1] !== durationMax)"
    class="catalog-tags"
  >
    <Tags>
      <transition-group name="fade">
        <Tag
          v-if="selectedDirectionValue"
          :bck="'blue1'"
        >
          {{ selectedDirectionValue.name }}
          <template #after>
            <Icon
              name="close"
              color="grey2"
              :size="[15, 15]"
              class="cursor--pointer"
              @click="onClickResetDirection"
              @keyup="onClickResetDirection"
            />
          </template>
        </Tag>
        <Tag
          v-if="selectedRatingValue"
          :bck="'blue1'"
        >
          {{ getSelectedRatingLabel() }}
          <template #after>
            <Icon
              name="close"
              color="grey2"
              :size="[15, 15]"
              class="cursor--pointer"
              @click="onClickResetRating"
              @keyup="onClickResetRating"
            />
          </template>
        </Tag>
        <Tag
          v-if="selectedPricesValue[0] !== priceMin || selectedPricesValue[1] !== priceMax"
          :bck="'blue1'"
        >
          <template v-if="selectedPricesValue[0] === selectedPricesValue[1]">
            {{ money(selectedPricesValue[0]) }} ₽
          </template>
          <template v-else>
            {{ money(selectedPricesValue[0]) }} ₽ – {{ money(selectedPricesValue[1]) }} ₽
          </template>
          <template #after>
            <Icon
              name="close"
              color="grey2"
              :size="[15, 15]"
              class="cursor--pointer"
              @click="onClickResetPrices"
              @keyup="onClickResetPrices"
            />
          </template>
        </Tag>
        <Tag
          v-if="selectedLoanValue"
          :bck="'blue1'"
        >
          Рассрочка
          <template #after>
            <Icon
              name="close"
              color="grey2"
              :size="[15, 15]"
              class="cursor--pointer"
              @click="onClickResetLoan"
              @keyup="onClickResetLoan"
            />
          </template>
        </Tag>
        <Tag
          v-if="selectedFreeValue"
          :bck="'blue1'"
        >
          Только бесплатные
          <template #after>
            <Icon
              name="close"
              color="grey2"
              :size="[15, 15]"
              class="cursor--pointer"
              @click="onClickResetFree"
              @keyup="onClickResetFree"
            />
          </template>
        </Tag>
        <Tag
          v-if="selectedDurationsValue[0] !== durationMin
            || selectedDurationsValue[1] !== durationMax"
          :bck="'blue1'"
        >
          <template v-if="selectedDurationsValue[0] === selectedDurationsValue[1]">
            {{ selectedDurationsValue[0] }} {{ getLabelDuration(selectedDurationsValue[0]) }}
          </template>
          <template v-else>
            {{ selectedDurationsValue[0] }} {{ getLabelDuration(selectedDurationsValue[0]) }}
            –
            {{ money(selectedDurationsValue[1]) }} {{ getLabelDuration(selectedDurationsValue[1]) }}
          </template>
          <template #after>
            <Icon
              name="close"
              color="grey2"
              :size="[15, 15]"
              class="cursor--pointer"
              @click="onClickResetDurations"
              @keyup="onClickResetDurations"
            />
          </template>
        </Tag>
      </transition-group>
    </Tags>
  </div>
</template>

<script lang="ts" setup>
import { isEqual } from 'lodash';
import {
  PropType,
  ref,
  toRefs,
  watch,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import Tag from '@/components/atoms/Tag.vue';
import Tags from '@/components/molecules/Tags.vue';
import ELevel from '@/enums/components/molecules/level';
import { money } from '@/helpers/number';
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
    default: null,
  },
  priceMax: {
    type: Number,
    required: false,
    default: null,
  },
  selectedPrices: {
    type: Array as PropType<Array<number>>,
    required: false,
    default: () => [],
  },
  durationMin: {
    type: Number,
    required: false,
    default: null,
  },
  durationMax: {
    type: Number,
    required: false,
    default: null,
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

//

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
  'update:selected-direction': (_: IDirection | null) => true,
  'update:selected-rating': (_: IRating | null) => true,
  'update:selected-schools': (_: Array<ISchool>) => true,
  'update:selected-categories': (_: Array<ICategory>) => true,
  'update:selected-professions': (_: Array<IProfession>) => true,
  'update:selected-teachers': (_: Array<ITeacher>) => true,
  'update:selected-skills': (_: Array<ISkill>) => true,
  'update:selected-tools': (_: Array<ITool>) => true,
  'update:selected-format': (_: IFormat) => true,
  'update:selected-levels': (_: Array<ILevel>) => true,
  'update:selected-prices': (_: Array<number>) => true,
  'update:selected-durations': (_: Array<number>) => true,
  'update:selected-loan': (_: Boolean) => true,
  'update:selected-free': (_: Boolean) => true,
});

//

const selectedDirectionValue = ref<IDirection | null>(selectedDirection.value);

watch(selectedDirectionValue, () => {
  emit('update:selected-direction', selectedDirectionValue.value);
});

watch(selectedDirection, () => {
  selectedDirectionValue.value = selectedDirection.value;
});

const onClickResetDirection = (): void => {
  selectedDirectionValue.value = null;
};

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

const getSelectedRatingLabel = (): string | null => {
  const selectedRatingValueFound = props.ratings.find(
    (itm) => itm.value === selectedRatingValue.value,
  );

  return selectedRatingValueFound ? selectedRatingValueFound.label : null;
};

const onClickResetRating = (): void => {
  selectedRatingValue.value = null;
};

//

const selectedPricesValue = ref(selectedPrices.value);

watch(selectedPricesValue, () => {
  emit('update:selected-prices', selectedPricesValue.value);
});

watch(selectedPrices, () => {
  selectedPricesValue.value = selectedPrices.value;
});

const onClickResetPrices = (): void => {
  selectedPricesValue.value = [props.priceMin, props.priceMax];
};

//

const selectedLoanValue = ref(selectedLoan.value);

watch(selectedLoanValue, () => {
  emit('update:selected-loan', selectedLoanValue.value);
});

watch(selectedLoan, () => {
  selectedLoanValue.value = selectedLoan.value;
});

const onClickResetLoan = (): void => {
  selectedLoanValue.value = false;
};

//

const selectedFreeValue = ref(selectedFree.value);

watch(selectedFreeValue, () => {
  emit('update:selected-free', selectedFreeValue.value);
});

watch(selectedFree, () => {
  selectedFreeValue.value = selectedFree.value;
});

const onClickResetFree = (): void => {
  selectedFreeValue.value = false;
};

//

const selectedDurationsValue = ref(selectedDurations.value);

watch(selectedDurationsValue, () => {
  emit('update:selected-durations', selectedDurationsValue.value);
});

watch(selectedDurations, () => {
  selectedDurationsValue.value = selectedDurations.value;
});

const onClickResetDurations = (): void => {
  selectedDurations.value = [props.durationMin, props.durationMax];
};

const getLabelDuration = (val: number) => {
  if (val === 0) {
    return 'месяцев';
  }

  if (val === 1) {
    return 'месяц';
  }

  if (val >= 2 && val <= 4) {
    return 'месяца';
  }

  return 'месяцев';
};

//

const selectedSchoolsValue = ref(selectedSchools.value);

watch(selectedSchoolsValue, () => {
  emit('update:selected-schools', selectedSchoolsValue.value);
});

watch(selectedSchools, () => {
  selectedSchoolsValue.value = selectedSchools.value;
});

const onClickResetSchools = (): void => {
  selectedSchoolsValue.value = [];
};

//

const selectedCategoriesValue = ref(selectedCategories.value);

watch(selectedCategoriesValue, () => {
  emit('update:selected-categories', selectedCategoriesValue.value);
});

watch(selectedCategories, () => {
  selectedCategoriesValue.value = selectedCategories.value;
});

const onClickResetCategories = (): void => {
  selectedCategoriesValue.value = [];
};

//

const selectedProfessionsValue = ref(selectedProfessions.value);

watch(selectedProfessionsValue, () => {
  emit('update:selected-professions', selectedProfessionsValue.value);
});

watch(selectedProfessions, () => {
  selectedProfessionsValue.value = selectedProfessions.value;
});

const onClickResetProfessions = (): void => {
  selectedProfessionsValue.value = [];
};

//

const selectedTeachersValue = ref(selectedTeachers.value);

watch(selectedTeachersValue, () => {
  emit('update:selected-teachers', selectedTeachersValue.value);
});

watch(selectedTeachers, () => {
  selectedTeachersValue.value = selectedTeachers.value;
});

const onClickResetTeachers = (): void => {
  selectedTeachersValue.value = [];
};

//

const selectedSkillsValue = ref(selectedSkills.value);

watch(selectedSkillsValue, () => {
  emit('update:selected-skills', selectedSkillsValue.value);
});

watch(selectedSkills, () => {
  selectedSkillsValue.value = selectedSkills.value;
});

const onClickResetSkills = (): void => {
  selectedSkillsValue.value = [];
};

//

const selectedToolsValue = ref(selectedTools.value);

watch(selectedToolsValue, () => {
  emit('update:selected-tools', selectedToolsValue.value);
});

watch(selectedTools, () => {
  selectedToolsValue.value = selectedTools.value;
});

const onClickResetTools = (): void => {
  selectedToolsValue.value = [];
};

//

const selectedFormatValue = ref<boolean | null>(selectedFormat.value?.value);

watch(selectedFormatValue, () => {
  const selectedFormatValueFound = props.formats.find(
    (itm) => itm.value === selectedFormatValue.value,
  );

  if (selectedFormatValueFound) {
    emit('update:selected-format', selectedFormatValueFound);
  }
});

watch(selectedFormat, () => {
  selectedFormatValue.value = selectedFormat.value.value;
});

const onClickResetFormat = (): void => {
  selectedFormatValue.value = null;
};

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

const onClickResetLevels = (): void => {
  selectedLevelsValue.value = [];
};
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/catalogTags.scss";
</style>
