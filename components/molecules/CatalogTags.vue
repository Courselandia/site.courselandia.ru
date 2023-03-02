<template>
  <div
    v-if="selectedDirectionValue
      || selectedRatingValue
      || (selectedPricesValue[0] !== priceMin || selectedPricesValue[1] !== priceMax)
      || selectedCreditValue
      || selectedFreeValue
      || (selectedDurationsValue[0] !== durationMin || selectedDurationsValue[1] !== durationMax)
      || selectedSchoolsValue?.length
      || selectedCategoriesValue?.length
      || selectedProfessionsValue?.length
      || selectedTeachersValue?.length
      || selectedSkillsValue?.length
      || selectedToolsValue?.length
      || selectedFormat !== null
      || selectedLevelsValue?.length"
    class="catalog-tags"
  >
    <transition name="fade">
      <div
        v-if="!resetAll && countFilters"
        class="catalog-tags__header"
      >
        <div class="catalog-tags__total">
          Активные фильтры ({{ countFilters }})
        </div>
        <div class="catalog-tags__reset">
          <Tag
            bck="black"
            color="white"
            cursor
            @click="onClickResetAll"
          >
            Очистить все
          </Tag>
        </div>
      </div>
    </transition>

    <div class="catalog-tags__items">
      <Tags>
        <transition-group name="fade">
          <Tag
            v-if="selectedDirectionValue"
            bck="blue1"
          >
            {{ selectedDirectionValue.name }}
            <template #after>
              <Icon
                name="close"
                color="grey2"
                :size="[15, 15]"
                class="cursor--pointer"
                @click="onClickResetDirection(false)"
                @keyup="onClickResetDirection(false)"
              />
            </template>
          </Tag>

          <Tag
            v-if="selectedRatingValue"
            bck="blue1"
          >
            Рейтинг {{ getSelectedRatingLabel() }}
            <template #after>
              <Icon
                name="close"
                color="grey2"
                :size="[15, 15]"
                class="cursor--pointer"
                @click="onClickResetRating(false)"
                @keyup="onClickResetRating(false)"
              />
            </template>
          </Tag>

          <Tag
            v-if="priceMin !== priceMax
              && (
                selectedPricesValue[0] !== priceMin
                || selectedPricesValue[1] !== priceMax
              )
              && !selectedFreeValue
            "
            bck="blue1"
          >
            Цена:
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
                @click="onClickResetPrices(false)"
                @keyup="onClickResetPrices(false)"
              />
            </template>
          </Tag>

          <Tag
            v-if="selectedCreditValue"
            bck="blue1"
          >
            Рассрочка
            <template #after>
              <Icon
                name="close"
                color="grey2"
                :size="[15, 15]"
                class="cursor--pointer"
                @click="onClickResetCredit(false)"
                @keyup="onClickResetCredit(false)"
              />
            </template>
          </Tag>

          <Tag
            v-if="selectedFreeValue"
            bck="blue1"
          >
            Только бесплатные
            <template #after>
              <Icon
                name="close"
                color="grey2"
                :size="[15, 15]"
                class="cursor--pointer"
                @click="onClickResetFree(false)"
                @keyup="onClickResetFree(false)"
              />
            </template>
          </Tag>

          <Tag
            v-if="durationMin !== durationMax
              && (
                selectedDurationsValue[0] !== durationMin
                || selectedDurationsValue[1] !== durationMax
              )
            "
            bck="blue1"
          >
            Длительность:
            <template v-if="selectedDurationsValue[0] === selectedDurationsValue[1]">
              {{ selectedDurationsValue[0] }} {{ getLabelDuration(selectedDurationsValue[0]) }}
            </template>
            <template v-else>
              {{ selectedDurationsValue[0] }}
              {{ getLabelDuration(selectedDurationsValue[0]) }}
              –
              {{ money(selectedDurationsValue[1]) }}
              {{ getLabelDuration(selectedDurationsValue[1]) }}
            </template>
            <template #after>
              <Icon
                name="close"
                color="grey2"
                :size="[15, 15]"
                class="cursor--pointer"
                @click="onClickResetDurations(false)"
                @keyup="onClickResetDurations(false)"
              />
            </template>
          </Tag>

          <template v-if="selectedSchoolsValue?.length">
            <Tag
              v-for="(school, key) in selectedSchoolsValue"
              :key="key"
              bck="blue1"
            >
              {{ school.label }}
              <template #after>
                <Icon
                  name="close"
                  color="grey2"
                  :size="[15, 15]"
                  class="cursor--pointer"
                  @click="onClickResetSchool(key)"
                  @keyup="onClickResetSchool(key)"
                />
              </template>
            </Tag>
          </template>

          <template v-if="selectedCategoriesValue?.length">
            <Tag
              v-for="(category, key) in selectedCategoriesValue"
              :key="key"
              bck="blue1"
            >
              {{ category.label }}
              <template #after>
                <Icon
                  name="close"
                  color="grey2"
                  :size="[15, 15]"
                  class="cursor--pointer"
                  @click="onClickResetCategory(key)"
                  @keyup="onClickResetCategory(key)"
                />
              </template>
            </Tag>
          </template>

          <template v-if="selectedProfessionsValue?.length">
            <Tag
              v-for="(profession, key) in selectedProfessionsValue"
              :key="key"
              bck="blue1"
            >
              {{ profession.label }}
              <template #after>
                <Icon
                  name="close"
                  color="grey2"
                  :size="[15, 15]"
                  class="cursor--pointer"
                  @click="onClickResetProfession(key)"
                  @keyup="onClickResetProfession(key)"
                />
              </template>
            </Tag>
          </template>

          <template v-if="selectedTeachersValue?.length">
            <Tag
              v-for="(teacher, key) in selectedTeachersValue"
              :key="key"
              bck="blue1"
            >
              {{ teacher.label }}
              <template #after>
                <Icon
                  name="close"
                  color="grey2"
                  :size="[15, 15]"
                  class="cursor--pointer"
                  @click="onClickResetTeacher(key)"
                  @keyup="onClickResetTeacher(key)"
                />
              </template>
            </Tag>
          </template>

          <template v-if="selectedSkillsValue?.length">
            <Tag
              v-for="(skill, key) in selectedSkillsValue"
              :key="key"
              bck="blue1"
            >
              {{ skill.label }}
              <template #after>
                <Icon
                  name="close"
                  color="grey2"
                  :size="[15, 15]"
                  class="cursor--pointer"
                  @click="onClickResetSkill(key)"
                  @keyup="onClickResetSkill(key)"
                />
              </template>
            </Tag>
          </template>

          <template v-if="selectedToolsValue?.length">
            <Tag
              v-for="(tool, key) in selectedToolsValue"
              :key="key"
              bck="blue1"
            >
              {{ tool.label }}
              <template #after>
                <Icon
                  name="close"
                  color="grey2"
                  :size="[15, 15]"
                  class="cursor--pointer"
                  @click="onClickResetTool(key)"
                  @keyup="onClickResetTool(key)"
                />
              </template>
            </Tag>
          </template>

          <Tag
            v-if="selectedFormat"
            bck="blue1"
          >
            {{ selectedFormat.label }}
            <template #after>
              <Icon
                name="close"
                color="grey2"
                :size="[15, 15]"
                class="cursor--pointer"
                @click="onClickResetFormat(false)"
                @keyup="onClickResetFormat(false)"
              />
            </template>
          </Tag>

          <template v-if="selectedLevelsValue?.length">
            <Tag
              v-for="(level, key) in selectedLevelsValue"
              :key="key"
              bck="blue1"
            >
              {{ getSelectedLevelLabel(level) }}
              <template #after>
                <Icon
                  name="close"
                  color="grey2"
                  :size="[15, 15]"
                  class="cursor--pointer"
                  @click="onClickResetLevel(key)"
                  @keyup="onClickResetLevel(key)"
                />
              </template>
            </Tag>
          </template>

          <Tag
            v-if="resetAll"
            bck="black"
            color="white"
            cursor
            @click="onClickResetAll"
          >
            Очистить все
          </Tag>
        </transition-group>
      </Tags>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  cloneDeep,
  isEqual,
} from 'lodash';
import {
  computed,
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
  selectedCredit: {
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
  selectedSchools: {
    type: Array as PropType<Array<ISchool>>,
    required: false,
    default: () => [],
  },
  selectedCategories: {
    type: Array as PropType<Array<ICategory>>,
    required: false,
    default: () => [],
  },
  selectedProfessions: {
    type: Array as PropType<Array<IProfession>>,
    required: false,
    default: () => [],
  },
  selectedTeachers: {
    type: Array as PropType<Array<ITeacher>>,
    required: false,
    default: () => [],
  },
  selectedSkills: {
    type: Array as PropType<Array<ISkill>>,
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
  resetAll: {
    type: Boolean,
    required: false,
    default: false,
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
  selectedCredit,
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
  'update:selected-format': (_: IFormat | null) => true,
  'update:selected-levels': (_: Array<ILevel>) => true,
  'update:selected-prices': (_: Array<number>) => true,
  'update:selected-durations': (_: Array<number>) => true,
  'update:selected-credit': (_: Boolean) => true,
  'update:selected-free': (_: Boolean) => true,
  remove: () => true,
});

//

const selectedDirectionValue = ref<IDirection | null>(selectedDirection.value);

watch(selectedDirectionValue, () => {
  emit('update:selected-direction', selectedDirectionValue.value);
});

watch(selectedDirection, () => {
  selectedDirectionValue.value = selectedDirection.value;
});

const onClickResetDirection = (silence: boolean = false): void => {
  selectedDirectionValue.value = null;

  if (!silence) {
    emit('remove');
  }
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

const onClickResetRating = (silence: boolean = false): void => {
  selectedRatingValue.value = null;

  if (!silence) {
    emit('remove');
  }
};

//

const selectedPricesValue = ref(selectedPrices.value);

watch(selectedPricesValue, () => {
  emit('update:selected-prices', selectedPricesValue.value);
});

watch(selectedPrices, () => {
  selectedPricesValue.value = selectedPrices.value;
});

const onClickResetPrices = (silence: boolean = false): void => {
  selectedPricesValue.value = [props.priceMin, props.priceMax];

  if (!silence) {
    emit('remove');
  }
};

//

const selectedCreditValue = ref(selectedCredit.value);

watch(selectedCreditValue, () => {
  emit('update:selected-credit', selectedCreditValue.value);
});

watch(selectedCredit, () => {
  selectedCreditValue.value = selectedCredit.value;
});

const onClickResetCredit = (silence: boolean = false): void => {
  selectedCreditValue.value = false;

  if (!silence) {
    emit('remove');
  }
};

//

const selectedFreeValue = ref(selectedFree.value);

watch(selectedFreeValue, () => {
  emit('update:selected-free', selectedFreeValue.value);
});

watch(selectedFree, () => {
  selectedFreeValue.value = selectedFree.value;
});

const onClickResetFree = (silence: boolean = false): void => {
  selectedFreeValue.value = false;

  if (!silence) {
    emit('remove');
  }
};

//

const selectedDurationsValue = ref(selectedDurations.value);

watch(selectedDurationsValue, () => {
  emit('update:selected-durations', selectedDurationsValue.value);
});

watch(selectedDurations, () => {
  selectedDurationsValue.value = selectedDurations.value;
});

const onClickResetDurations = (silence: boolean = false): void => {
  selectedDurationsValue.value = [props.durationMin, props.durationMax];

  if (!silence) {
    emit('remove');
  }
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

const onClickResetSchool = (index: number): void => {
  selectedSchoolsValue.value.splice(index, 1);
  selectedSchoolsValue.value = cloneDeep(selectedSchoolsValue.value);

  emit('remove');
};

//

const selectedCategoriesValue = ref(selectedCategories.value);

watch(selectedCategoriesValue, () => {
  emit('update:selected-categories', selectedCategoriesValue.value);
});

watch(selectedCategories, () => {
  selectedCategoriesValue.value = selectedCategories.value;
});

const onClickResetCategory = (index: number): void => {
  selectedCategoriesValue.value.splice(index, 1);
  selectedCategoriesValue.value = cloneDeep(selectedCategoriesValue.value);

  emit('remove');
};

//

const selectedProfessionsValue = ref(selectedProfessions.value);

watch(selectedProfessionsValue, () => {
  emit('update:selected-professions', selectedProfessionsValue.value);
});

watch(selectedProfessions, () => {
  selectedProfessionsValue.value = selectedProfessions.value;
});

const onClickResetProfession = (index: number): void => {
  selectedProfessionsValue.value.splice(index, 1);
  selectedProfessionsValue.value = cloneDeep(selectedProfessionsValue.value);

  emit('remove');
};

//

const selectedTeachersValue = ref(selectedTeachers.value);

watch(selectedTeachersValue, () => {
  emit('update:selected-teachers', selectedTeachersValue.value);
});

watch(selectedTeachers, () => {
  selectedTeachersValue.value = selectedTeachers.value;
});

const onClickResetTeacher = (index: number): void => {
  selectedTeachersValue.value.splice(index, 1);
  selectedTeachersValue.value = cloneDeep(selectedTeachersValue.value);

  emit('remove');
};

//

const selectedSkillsValue = ref(selectedSkills.value);

watch(selectedSkillsValue, () => {
  emit('update:selected-skills', selectedSkillsValue.value);
});

watch(selectedSkills, () => {
  selectedSkillsValue.value = selectedSkills.value;
});

const onClickResetSkill = (index: number): void => {
  selectedSkillsValue.value.splice(index, 1);
  selectedSkillsValue.value = cloneDeep(selectedSkillsValue.value);

  emit('remove');
};

//

const selectedToolsValue = ref(selectedTools.value);

watch(selectedToolsValue, () => {
  emit('update:selected-tools', selectedToolsValue.value);
});

watch(selectedTools, () => {
  selectedToolsValue.value = selectedTools.value;
});

const onClickResetTool = (index: number): void => {
  selectedToolsValue.value.splice(index, 1);
  selectedToolsValue.value = cloneDeep(selectedToolsValue.value);

  emit('remove');
};

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

const onClickResetFormat = (silence: boolean = false): void => {
  selectedFormatValue.value = null;

  if (!silence) {
    emit('remove');
  }
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

const onClickResetLevel = (index: number): void => {
  selectedLevelsValue.value?.splice(index, 1);
  selectedLevelsValue.value = cloneDeep(selectedLevelsValue.value);

  emit('remove');
};

const getSelectedLevelLabel = (level: ELevel): string | null => {
  const selectedLevelValueFound = props.levels.find(
    (itm) => itm.value === level,
  );

  return selectedLevelValueFound ? selectedLevelValueFound.label : null;
};

const onClickResetAll = (): void => {
  onClickResetDirection(true);
  onClickResetRating(true);
  onClickResetPrices(true);
  onClickResetCredit(true);
  onClickResetFree(true);
  onClickResetDurations(true);
  selectedSchoolsValue.value = [];
  selectedCategoriesValue.value = [];
  selectedProfessionsValue.value = [];
  selectedTeachersValue.value = [];
  selectedSkillsValue.value = [];
  selectedToolsValue.value = [];
  onClickResetFormat(true);
  selectedLevelsValue.value = [];

  emit('remove');
};

const countFilters = computed((): number => {
  let total = 0;

  if (selectedDirectionValue.value) {
    total++;
  }

  if (selectedRatingValue.value) {
    total++;
  }

  if (
    selectedPricesValue.value[0] !== props.priceMin
    || selectedPricesValue.value[1] !== props.priceMax
  ) {
    total++;
  }

  if (selectedCreditValue.value) {
    total++;
  }

  if (selectedFreeValue.value) {
    total++;
  }

  if (
    selectedDurationsValue.value[0] !== props.durationMin
    || selectedDurationsValue.value[1] !== props.durationMax
  ) {
    total++;
  }

  if (selectedSchoolsValue.value?.length) {
    total += selectedSchoolsValue.value.length;
  }

  if (selectedCategoriesValue.value?.length) {
    total += selectedCategoriesValue.value.length;
  }

  if (selectedProfessionsValue.value?.length) {
    total += selectedProfessionsValue.value.length;
  }

  if (selectedTeachersValue.value?.length) {
    total += selectedTeachersValue.value.length;
  }

  if (selectedSkillsValue.value?.length) {
    total += selectedSkillsValue.value.length;
  }

  if (selectedToolsValue.value?.length) {
    total += selectedToolsValue.value.length;
  }

  if (selectedToolsValue.value?.length) {
    total += selectedToolsValue.value.length;
  }

  if (selectedFormat.value) {
    total++;
  }

  if (selectedLevelsValue.value?.length) {
    total += selectedLevelsValue.value.length;
  }

  return total;
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/catalogTags.scss";
</style>
