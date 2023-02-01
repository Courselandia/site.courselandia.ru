<template>
  <div class="catalog-tags">
    HERE
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

import Checkbox from '@/components/atoms/form/Checkbox.vue';
import Group from '@/components/atoms/form/Group.vue';
import Item from '@/components/atoms/form/Item.vue';
import Radio from '@/components/atoms/form/Radio.vue';
import RangeSlider from '@/components/atoms/form/RangeSlider.vue';
import Switch from '@/components/atoms/form/Switch.vue';
import Icon from '@/components/atoms/Icon.vue';
import Tag from '@/components/atoms/Tag.vue';
import CatalogFilterSelect from '@/components/molecules/CatalogFilterSelect.vue';
import Tags from '@/components/molecules/Tags.vue';
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
    required: true,
  },
  priceMax: {
    type: Number,
    required: true,
  },
  selectedPrices: {
    type: Array as PropType<Array<number>>,
    required: true,
  },
  durationMin: {
    type: Number,
    required: true,
  },
  durationMax: {
    type: Number,
    required: true,
  },
  selectedDurations: {
    type: Array as PropType<Array<number>>,
    required: true,
  },
  directions: {
    type: Array as PropType<Array<IDirection>>,
    required: true,
  },
  selectedDirection: {
    type: Object as PropType<IDirection>,
    required: false,
    default: null,
  },
  ratings: {
    type: Array as PropType<Array<IRating>>,
    required: true,
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
    required: true,
  },
  selectedSchools: {
    type: Object as PropType<Array<ISchool>>,
    required: false,
    default: null,
  },
  categories: {
    type: Array as PropType<Array<ICategory>>,
    required: true,
  },
  selectedCategories: {
    type: Object as PropType<Array<ICategory>>,
    required: false,
    default: null,
  },
  professions: {
    type: Array as PropType<Array<IProfession>>,
    required: true,
  },
  selectedProfessions: {
    type: Object as PropType<Array<IProfession>>,
    required: false,
    default: null,
  },
  teachers: {
    type: Array as PropType<Array<ITeacher>>,
    required: true,
  },
  selectedTeachers: {
    type: Object as PropType<Array<ITeacher>>,
    required: false,
    default: null,
  },
  skills: {
    type: Array as PropType<Array<ISkill>>,
    required: true,
  },
  selectedSkills: {
    type: Object as PropType<Array<ISkill>>,
    required: false,
    default: null,
  },
  tools: {
    type: Array as PropType<Array<ITool>>,
    required: true,
  },
  selectedTools: {
    type: Object as PropType<Array<ITool>>,
    required: false,
    default: null,
  },
  formats: {
    type: Array as PropType<Array<IFormat>>,
    required: true,
  },
  selectedFormat: {
    type: Object as PropType<IFormat>,
    required: false,
    default: null,
  },
  levels: {
    type: Array as PropType<Array<ILevel>>,
    required: true,
  },
  selectedLevels: {
    type: Object as PropType<Array<ILevel>>,
    required: false,
    default: null,
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
  'update:selected-direction': (_: IDirection) => true,
  'update:selected-rating': (_: IRating) => true,
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

const selectedDirectionValue = ref(selectedDirection.value);

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

  if (selectedRatingValueFound) {
    emit('update:selected-rating', selectedRatingValueFound);
  }
});

watch(selectedRating, () => {
  selectedRatingValue.value = selectedRating.value.value;
});

//

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
  selectedPrices.value = [props.priceMin, props.priceMax];
};

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

const onClickResetDurations = (): void => {
  selectedDurations.value = [props.durationMin, props.durationMax];
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