<template>
  <div
    v-if="hasFilters"
    class="tags"
  >
    <transition name="fade">
      <div
        v-if="!resetAll && totalFilters"
        class="tags__header"
      >
        <div class="tags__total">
          Активные фильтры ({{ totalFilters }})
        </div>
        <div class="tags__reset">
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

    <div class="tags__items">
      <Tags>
        <transition-group name="fade">
          <Tag
            v-if="selectedDirectionValue
              && (
                selectedDirectionValue.name
                || (directions && getDirectionLabel(directions, selectedDirectionValue))
              )"
            bck="blue1"
          >
            <template v-if="selectedDirectionValue?.name">
              {{ selectedDirectionValue?.name }}
            </template>
            <template v-else>
              {{ getDirectionLabel(directions, selectedDirectionValue) }}
            </template>
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
            v-if="searchValue"
            bck="blue1"
          >
            {{ searchValue }}
            <template #after>
              <Icon
                name="close"
                color="grey2"
                :size="[15, 15]"
                class="cursor--pointer"
                @click="onClickResetSearch(false)"
                @keyup="onClickResetSearch(false)"
              />
            </template>
          </Tag>

          <Tag
            v-if="selectedRatingValue"
            bck="blue1"
          >
            Рейтинг {{ getRatingLabel(ratings, selectedRatingValue) }}
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
            <template
              v-for="(school, key) in selectedSchoolsValue"
              :key="key"
            >
              <Tag
                v-if="school.label || (schools && getSchoolLabel(schools, school))"
                bck="blue1"
              >
                <template v-if="school.label">
                  {{ school.label }}
                </template>
                <template v-else>
                  {{ getSchoolLabel(schools, school) }}
                </template>
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
          </template>

          <template v-if="selectedCategoriesValue?.length">
            <template
              v-for="(category, key) in selectedCategoriesValue"
              :key="key"
            >
              <Tag
                v-if="category.label || (categories && getCategoryLabel(categories, category))"
                bck="blue1"
              >
                <template v-if="category.label">
                  {{ category.label }}
                </template>
                <template v-else>
                  {{ getCategoryLabel(categories, category) }}
                </template>
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
          </template>

          <template v-if="selectedProfessionsValue?.length">
            <template
              v-for="(profession, key) in selectedProfessionsValue"
              :key="key"
            >
              <Tag
                v-if="
                  profession.label
                    || (
                      professions && getProfessionLabel(professions, profession)
                    )"
                bck="blue1"
              >
                <template v-if="profession.label">
                  {{ profession.label }}
                </template>
                <template v-else>
                  {{ getProfessionLabel(professions, profession) }}
                </template>
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
          </template>

          <template v-if="selectedTeachersValue?.length">
            <template
              v-for="(teacher, key) in selectedTeachersValue"
              :key="key"
            >
              <Tag
                v-if="teacher.label || (teachers && getTeacherLabel(teachers, teacher))"
                bck="blue1"
              >
                <template v-if="teacher.label">
                  {{ teacher.label }}
                </template>
                <template v-else>
                  {{ getTeacherLabel(teachers, teacher) }}
                </template>
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
          </template>

          <template v-if="selectedSkillsValue?.length">
            <template
              v-for="(skill, key) in selectedSkillsValue"
              :key="key"
            >
              <Tag
                v-if="skill.label || (skills && getSkillLabel(skills, skill))"
                bck="blue1"
              >
                <template v-if="skill.label">
                  {{ skill.label }}
                </template>
                <template v-else>
                  {{ getSkillLabel(skills, skill) }}
                </template>
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
          </template>

          <template v-if="selectedToolsValue?.length">
            <template
              v-for="(tool, key) in selectedToolsValue"
              :key="key"
            >
              <Tag
                v-if="tool.label || (tools && getToolLabel(tools, tool))"
                bck="blue1"
              >
                <template v-if="tool.label">
                  {{ tool.label }}
                </template>
                <template v-else>
                  {{ getToolLabel(tools, tool) }}
                </template>
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
          </template>

          <Tag
            v-if="selectedFormat
              && (
                selectedFormat.label
                || (formats && getFormatLabel(formats, selectedFormat))
              )
            "
            bck="blue1"
          >
            <template v-if="selectedFormat?.label">
              {{ selectedFormat?.label }}
            </template>
            <template v-else>
              {{ getFormatLabel(formats, selectedFormat) }}
            </template>
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
              {{ getLevelLabel(levels, level) }}
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
import type {
  PropType,
} from 'vue';
import {
  computed,
  ref,
  toRefs,
  watch,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import Tag from '@/components/atoms/Tag.vue';
import Tags from '@/components/molecules/Tags.vue';
import ELevel from '@/enums/components/molecules/level';
import {
  getCategoryLabel,
  getDirectionLabel,
  getFormatLabel,
  getLevelLabel,
  getProfessionLabel,
  getRatingLabel,
  getSchoolLabel,
  getSkillLabel,
  getTeacherLabel,
  getToolLabel,
  hasCategories,
  hasDirection,
  hasLevels,
  hasProfessions,
  hasRating,
  hasSchools,
  hasSkills,
  hasTeachers,
  hasTools,
} from '@/helpers/chekFilter';
import { money } from '@/helpers/number';
import type ICategory from '@/interfaces/components/molecules/category';
import type IDirection from '@/interfaces/components/molecules/direction';
import type IFormat from '@/interfaces/components/molecules/format';
import type ILevel from '@/interfaces/components/molecules/level';
import type IProfession from '@/interfaces/components/molecules/profession';
import type IRating from '@/interfaces/components/molecules/rating';
import type ISchool from '@/interfaces/components/molecules/schoolFilter';
import type ISkill from '@/interfaces/components/molecules/skill';
import type ITeacher from '@/interfaces/components/molecules/teacher';
import type ITool from '@/interfaces/components/molecules/tool';
import type TId from '@/types/id';

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
  search: {
    type: String,
    required: false,
    default: null,
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
  directions: {
    type: Array as PropType<Array<IDirection>>,
    required: false,
    default: () => [],
  },
  schools: {
    type: Array as PropType<Array<ISchool>>,
    required: false,
    default: () => [],
  },
  categories: {
    type: Array as PropType<Array<ICategory>>,
    required: false,
    default: () => [],
  },
  professions: {
    type: Array as PropType<Array<IProfession>>,
    required: false,
    default: () => [],
  },
  teachers: {
    type: Array as PropType<Array<ITeacher>>,
    required: false,
    default: () => [],
  },
  skills: {
    type: Array as PropType<Array<ISkill>>,
    required: false,
    default: () => [],
  },
  tools: {
    type: Array as PropType<Array<ITool>>,
    required: false,
    default: () => [],
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
  totalFilters: {
    type: Number,
    required: false,
    default: 0,
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
  search,
  directions,
  schools,
  categories,
  professions,
  teachers,
  skills,
  tools,
  formats,
  levels,
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
  'update:search': (_: String) => true,
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

const selectedSchoolsValue = ref<Array<ISchool>>(selectedSchools.value);

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

const selectedCategoriesValue = ref<Array<ICategory>>(selectedCategories.value);

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

const selectedProfessionsValue = ref<Array<IProfession>>(selectedProfessions.value);

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

const selectedTeachersValue = ref<Array<ITeacher>>(selectedTeachers.value);

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

const selectedSkillsValue = ref<Array<ISkill>>(selectedSkills.value);

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

const selectedToolsValue = ref<Array<ITool>>(selectedTools.value);

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

const searchValue = ref(search.value);

watch(searchValue, () => {
  emit('update:search', searchValue.value);
});

watch(search, () => {
  searchValue.value = search.value;
});

const onClickResetSearch = (silence: boolean = false): void => {
  searchValue.value = '';

  if (!silence) {
    emit('remove');
  }
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

const onClickResetAll = (): void => {
  onClickResetDirection(true);
  onClickResetRating(true);
  onClickResetPrices(true);
  onClickResetCredit(true);
  onClickResetFree(true);
  onClickResetDurations(true);
  onClickResetSearch(true);
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

const hasFilters = computed(
  (): boolean => hasDirection(directions.value, selectedDirectionValue.value)
  || hasRating(props.ratings, selectedRatingValue.value)
  || (
    selectedPricesValue.value[0] !== props.priceMin
    || selectedPricesValue.value[1] !== props.priceMax
  )
  || selectedCreditValue.value
  || selectedFreeValue.value
  || (
    selectedDurationsValue.value[0] !== props.durationMin
    || selectedDurationsValue.value[1] !== props.durationMax
  )
  || hasSchools(schools.value, selectedSchoolsValue.value)
  || hasCategories(categories.value, selectedCategoriesValue.value)
  || hasProfessions(professions.value, selectedProfessionsValue.value)
  || hasTeachers(teachers.value, selectedTeachersValue.value)
  || hasSkills(skills.value, selectedSkillsValue.value)
  || hasTools(tools.value, selectedToolsValue.value)
  || (search.value !== '' && search.value !== null)
  || selectedFormat.value !== null
  || hasLevels(props.levels, selectedLevelsValue.value),
);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/tags";
</style>
