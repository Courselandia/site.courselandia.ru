<template>
  <div class="catalog-tags">
    HERE
  </div>
</template>

<script lang="ts" setup>
import {PropType, ref, toRefs, watch} from 'vue';

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
import TId from "~/types/id";
import ELevel from "~/enums/components/molecules/level";
import {isEqual} from "lodash";

const props = defineProps({
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


const selectedPrice = ref([priceMin.value, priceMax.value]);

const onClickResetPrice = (): void => {
  selectedPrice.value = [priceMin.value, priceMax.value];
};

const getLabelPrice = () => '₽';

//

const loan = ref(false);

//

const free = ref(false);

//

const durationMin = ref(0);
const durationMax = ref(60);
const durationStep = ref(1);
const selectedDuration = ref([durationMin.value, durationMax.value]);

const onClickResetDuration = (): void => {
  selectedDuration.value = [durationMin.value, durationMax.value];
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