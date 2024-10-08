<template>
  <div
    :class="`filters ${nameClass}`"
  >
    <div
      v-if="directions?.length && !mobile"
      key="directions"
      class="filters__directions"
    >
      <Tags>
        <Tag
          :border="selectedDirectionValue?.id ? 'grey2' : 'blue2'"
          border-hover="blue2"
          :bck="selectedDirectionValue?.id ? 'white' : 'blue2'"
          bck-hover="blue2"
          :color="selectedDirectionValue?.id ? 'black' : 'white'"
          color-hover="white"
          cursor
          @click="onClickDirection()"
          @keyup="onClickDirection()"
        >
          Все направления
        </Tag>
        <template
          v-if="directions"
        >
          <Tag
            v-for="(direction, key) in directions"
            :key="key"
            :border="(selectedDirectionValue?.id === direction.id) ? 'blue2' : 'grey2'"
            border-hover="blue2"
            :bck="selectedDirectionValue?.id === direction.id ? 'blue2' : 'white'"
            bck-hover="blue2"
            :color="selectedDirectionValue?.id === direction.id ? 'white' : 'black'"
            color-hover="white"
            cursor
            :disabled="direction.disabled"
            @click="onClickDirection(direction)"
            @keyup="onClickDirection(direction)"
          >
            {{ direction.name }}
          </Tag>
        </template>
      </Tags>
    </div>
    <div
      v-if="mobile"
      id="catalog-filters-mobile-tags"
      class="filters__tags"
    />
    <div class="filters__panel">
      <div
        v-if="directions?.length"
        class="filters__block filters__block--directions"
      >
        <Tags>
          <Tag
            :border="selectedDirectionValue?.id ? 'grey2' : 'blue2'"
            border-hover="blue2"
            :bck="selectedDirectionValue?.id ? 'white' : 'blue2'"
            bck-hover="blue2"
            :color="selectedDirectionValue?.id ? 'black' : 'white'"
            color-hover="white"
            cursor
            @click="onClickDirection()"
            @keyup="onClickDirection()"
          >
            Все направления
          </Tag>
          <Tag
            v-for="(direction, key) in directions"
            :key="key"
            :border="selectedDirectionValue?.id === direction.id ? 'blue2' : 'grey2'"
            border-hover="blue2"
            :bck="selectedDirectionValue?.id === direction.id ? 'blue2' : 'white'"
            bck-hover="blue2"
            :color="selectedDirectionValue?.id === direction.id ? 'white' : 'black'"
            color-hover="white"
            cursor
            :disabled="direction.disabled"
            @click="onClickDirection(direction)"
            @keyup="onClickDirection(direction)"
          >
            {{ direction.name }}
          </Tag>
        </Tags>
      </div>

      <div
        v-if="ratings?.length"
        key="ratings"
        class="filters__block"
      >
        <div class="filters__title">
          Рейтинг
        </div>
        <transition name="fade">
          <div
            v-if="ratings && hasRating(ratings, selectedRatingValue || null)"
            class="filters__reset"
            @click="onClickResetRating"
            @keyup="onClickResetRating"
          >
            <Icon
              name="close"
              color="white"
              :size="[15, 15]"
            />
          </div>
        </transition>
        <div class="filters__selection">
          <Group v-model:value="selectedRatingValue">
            <template
              v-if="ratings"
            >
              <Radio
                v-for="(rating, key) in ratings"
                :key="key"
                :value="rating.value"
                :label="rating.label || ''"
                :disabled="rating.disabled && selectedRatingValue !== rating.value"
                name="rating"
                @click="onClickRating"
              />
            </template>
          </Group>
        </div>
      </div>

      <div
        key="price"
        class="filters__block"
      >
        <div class="filters__title">
          Цена
        </div>
        <transition name="fade">
          <div
            v-if="selectedPricesValue[0] !== priceMin || selectedPricesValue[1] !== priceMax"
            class="filters__reset"
            @click="onClickResetPrices"
            @keyup="onClickResetPrices"
          >
            <Icon
              name="close"
              color="white"
              :size="[15, 15]"
            />
          </div>
        </transition>
        <div class="filters__selection">
          <RangeSlider
            v-model:value="selectedPricesValue"
            :min="priceMin"
            :max="priceMax"
            :step="priceStep"
            :label="getLabelPrice"
            :disabled="!(priceMax && priceMin !== priceMax)"
            convert-to-money
            @change="onChangePrices"
          />
        </div>
      </div>

      <div
        key="credit"
        class="filters__block"
      >
        <Item
          label="Рассрочка"
          horizontal
        >
          <Switch
            v-model:value="selectedCreditValue"
            name="credit"
            :disabled="!availableCredit"
            @click="onClickCredit"
          />
        </Item>
      </div>

      <div
        key="free"
        class="filters__block"
      >
        <Item
          label="Только бесплатные"
          horizontal
        >
          <Switch
            v-model:value="selectedFreeValue"
            name="free"
            :disabled="!availableFree"
            @click="onClickFree"
          />
        </Item>
      </div>

      <div
        key="duration"
        class="filters__block"
      >
        <div class="filters__title">
          Длительность
        </div>
        <transition name="fade">
          <div
            v-if="selectedDurationsValue[0] !== durationMin
              || selectedDurationsValue[1] !== durationMax"
            class="filters__reset"
            @click="onClickResetDurations"
            @keyup="onClickResetDurations"
          >
            <Icon
              name="close"
              color="white"
              :size="[15, 15]"
            />
          </div>
        </transition>
        <div class="filters__selection">
          <RangeSlider
            v-model:value="selectedDurationsValue"
            :min="durationMin"
            :max="durationMax"
            :step="durationStep"
            :label="getLabelDuration"
            :disabled="!(durationMax && durationMax !== durationMin)"
            @change="onChangeDurations"
          />
        </div>
      </div>

      <div
        v-if="schools?.length"
        key="schools"
        class="filters__block"
      >
        <div class="filters__title">
          Школы
        </div>
        <transition name="fade">
          <div
            v-if="hasSchools(schools, selectedSchoolsValue)"
            class="filters__reset"
            @click="onClickResetSchools"
            @keyup="onClickResetSchools"
          >
            <Icon
              name="close"
              color="white"
              :size="[15, 15]"
            />
          </div>
        </transition>
        <div class="filters__selection">
          <FilterSelect
            v-model:value="selectedSchoolsValue"
            :items="schools"
            :simple="schools?.length < 11"
            @load-items="onLoadItems('schools', $event)"
            @click="onClickSchools"
          />
        </div>
      </div>

      <div
        v-if="categories?.length"
        key="categories"
        class="filters__block"
      >
        <div class="filters__title">
          Категории
        </div>
        <transition name="fade">
          <div
            v-if="hasCategories(categories, selectedCategoriesValue)"
            class="filters__reset"
            @click="onClickResetCategories"
            @keyup="onClickResetCategories"
          >
            <Icon
              name="close"
              color="white"
              :size="[15, 15]"
            />
          </div>
        </transition>
        <div class="filters__selection">
          <FilterSelect
            v-model:value="selectedCategoriesValue"
            :items="categories"
            :simple="categories?.length < 11"
            @load-items="onLoadItems('categories', $event)"
            @click="onClickCategories"
          />
        </div>
      </div>

      <div
        v-if="professions?.length"
        key="professions"
        class="filters__block"
      >
        <div class="filters__title">
          Профессии
        </div>
        <transition name="fade">
          <div
            v-if="hasProfessions(professions, selectedProfessionsValue)"
            class="filters__reset"
            @click="onClickResetProfessions"
            @keyup="onClickResetProfessions"
          >
            <Icon
              name="close"
              color="white"
              :size="[15, 15]"
            />
          </div>
        </transition>
        <div class="filters__selection">
          <FilterSelect
            v-model:value="selectedProfessionsValue"
            :items="professions"
            :simple="professions?.length < 11"
            @load-items="onLoadItems('professions', $event)"
            @click="onClickProfessions"
          />
        </div>
      </div>

      <div
        v-if="teachers?.length"
        key="teachers"
        class="filters__block"
      >
        <div class="filters__title">
          Учителя
        </div>
        <transition name="fade">
          <div
            v-if="hasTeachers(teachers, selectedTeachersValue)"
            class="filters__reset"
            @click="onClickResetTeachers"
            @keyup="onClickResetTeachers"
          >
            <Icon
              name="close"
              color="white"
              :size="[15, 15]"
            />
          </div>
        </transition>
        <div class="filters__selection">
          <FilterSelect
            v-model:value="selectedTeachersValue"
            :items="teachers"
            :simple="teachers?.length < 11"
            @load-items="onLoadItems('teachers', $event)"
            @click="onClickTeachers"
          />
        </div>
      </div>

      <div
        v-if="skills?.length"
        key="skills"
        class="filters__block"
      >
        <div class="filters__title">
          Навыки
        </div>
        <transition name="fade">
          <div
            v-if="hasSkills(skills, selectedSkillsValue)"
            class="filters__reset"
            @click="onClickResetSkills"
            @keyup="onClickResetSkills"
          >
            <Icon
              name="close"
              color="white"
              :size="[15, 15]"
            />
          </div>
        </transition>
        <div class="filters__selection">
          <FilterSelect
            v-model:value="selectedSkillsValue"
            :items="skills"
            :simple="skills?.length < 11"
            @load-items="onLoadItems('skills', $event)"
            @click="onClickSkills"
          />
        </div>
      </div>

      <div
        v-if="tools?.length"
        key="tools"
        class="filters__block"
      >
        <div class="filters__title">
          Инструменты
        </div>
        <transition name="fade">
          <div
            v-if="hasTools(tools, selectedToolsValue)"
            class="filters__reset"
            @click="onClickResetTools"
            @keyup="onClickResetTools"
          >
            <Icon
              name="close"
              color="white"
              :size="[15, 15]"
            />
          </div>
        </transition>
        <div class="filters__selection">
          <FilterSelect
            v-model:value="selectedToolsValue"
            :items="tools"
            :simple="tools?.length < 11"
            @load-items="onLoadItems('tools', $event)"
            @click="onClickTools"
          />
        </div>
      </div>

      <div
        v-if="formats?.length"
        key="formats"
        class="filters__block"
      >
        <div class="filters__title">
          Форма обучения
        </div>
        <transition name="fade">
          <div
            v-if="selectedFormatValue"
            class="filters__reset"
            @click="onClickResetFormat"
            @keyup="onClickResetFormat"
          >
            <Icon
              name="close"
              color="white"
              :size="[15, 15]"
            />
          </div>
        </transition>
        <div class="filters__selection">
          <Group v-model:value="selectedFormatValue">
            <template
              v-if="formats"
            >
              <Radio
                v-for="(format, key) in formats"
                :key="key"
                :value="format.value"
                :label="format.label || ''"
                name="format"
                @click="onClickFormat"
              />
            </template>
          </Group>
        </div>
      </div>

      <div
        v-if="levels?.length"
        key="levels"
        class="filters__block"
      >
        <div class="filters__title">
          Уровни курса
        </div>

        <transition name="fade">
          <div
            v-if="hasLevels(levels, selectedLevelsValue || null)"
            class="filters__reset"
            @click="onClickResetLevels"
            @keyup="onClickResetLevels"
          >
            <Icon
              name="close"
              color="white"
              :size="[15, 15]"
            />
          </div>
        </transition>
        <div class="filters__selection">
          <Group v-model:value="selectedLevelsValue">
            <template
              v-if="levels"
            >
              <Checkbox
                v-for="(level, key) in levels"
                :key="key"
                :value="level.value"
                :label="level.label || ''"
                name="level"
                @click="onClickLevels"
              />
            </template>
          </Group>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import lodash from 'lodash';
import type {
  PropType,
} from 'vue';
import {
  computed,
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
import FilterSelect from '@/components/modules/catalog/molecules/FilterSelect.vue';
import Tags from '@/components/molecules/Tags.vue';
import ELevel from '@/enums/components/modules/catalog/level';
import {
  hasCategories,
  hasLevels,
  hasProfessions,
  hasRating,
  hasSchools,
  hasSkills,
  hasTeachers,
  hasTools,
} from '@/helpers/chekFilter';
import type ICategory from '@/interfaces/components/modules/catalog/category';
import type IDirection from '@/interfaces/components/modules/catalog/direction';
import type IFormat from '@/interfaces/components/modules/catalog/format';
import type ILevel from '@/interfaces/components/modules/catalog/level';
import type ISchool from '@/interfaces/components/modules/catalog/schoolFilter';
import type ISkill from '@/interfaces/components/modules/catalog/skill';
import type ITeacher from '@/interfaces/components/modules/catalog/teacher';
import type ITool from '@/interfaces/components/modules/catalog/tool';
import type IProfession from '@/interfaces/components/modules/profession';
import type IRating from '@/interfaces/components/modules/rating';

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
  mobile: {
    type: Boolean,
    required: false,
    default: false,
  },
  availableCredit: {
    type: Boolean,
    required: false,
    default: true,
  },
  availableFree: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const { isEqual } = lodash;

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
  'load-items': (_: string, __?: Function) => true,
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
  'change-prices': (_: Number | Array<Number>) => true,
  'change-durations': (_: Number | Array<Number>) => true,
  change: () => true,
});

//

const nameClass = computed(() => {
  const classes = [];

  if (props.mobile) {
    classes.push('filters--mobile');
  }

  return classes.join(' ');
});

//

const onLoadItems = (name: string, callback?: Function): void => {
  emit('load-items', name, callback);
};

//

const selectedDirectionValue = ref<IDirection | null>(selectedDirection.value);

watch(selectedDirectionValue, () => {
  emit('update:selected-direction', selectedDirectionValue.value);
});

watch(selectedDirection, () => {
  selectedDirectionValue.value = selectedDirection.value;
});

const onClickDirection = (value: IDirection | null = null): void => {
  if (value?.disabled === true) {
    return;
  }

  const toChange = selectedDirectionValue.value !== value;
  selectedDirectionValue.value = value;

  if (toChange) {
    emit('change');
  }
};

//

const selectedRatingValue = ref<number | undefined>(selectedRating.value?.value || undefined);

watch(selectedRatingValue, () => {
  const selectedRatingValueFound = props.ratings.find(
    (itm) => itm.value === selectedRatingValue.value,
  );

  emit('update:selected-rating', selectedRatingValueFound || null);
});

watch(selectedRating, () => {
  selectedRatingValue.value = selectedRating.value?.value;
});

const onClickRating = (val: string | number | boolean): void => {
  if (val !== selectedRatingValue.value) {
    emit('change');
  }
};

//

const onClickResetRating = (): void => {
  selectedRatingValue.value = undefined;
  emit('change');
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
  emit('change');
};

const getLabelPrice = () => '₽';

const onChangePrices = (): void => {
  emit('change-prices', selectedPricesValue.value);
};

//

const selectedCreditValue = ref<boolean>(selectedCredit.value || false);

watch(selectedCreditValue, () => {
  emit('update:selected-credit', selectedCreditValue.value);
});

watch(selectedCredit, () => {
  selectedCreditValue.value = selectedCredit.value;
});

const onClickCredit = (): void => {
  emit('change');
};

//

const selectedFreeValue = ref<boolean>(selectedFree.value || false);

watch(selectedFreeValue, () => {
  emit('update:selected-free', selectedFreeValue.value);
});

watch(selectedFree, () => {
  selectedFreeValue.value = selectedFree.value;
});

const onClickFree = (): void => {
  emit('change');
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
  selectedDurationsValue.value = [props.durationMin, props.durationMax];
  emit('change');
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

const onChangeDurations = (): void => {
  emit('change-durations', selectedDurationsValue.value);
};

//

const selectedSchoolsValue = ref<Array<ISchool>>(selectedSchools.value || []);

watch(selectedSchoolsValue, () => {
  emit('update:selected-schools', selectedSchoolsValue.value);
});

watch(selectedSchools, () => {
  selectedSchoolsValue.value = selectedSchools.value;
});

const onClickResetSchools = (): void => {
  selectedSchoolsValue.value = [];
  emit('change');
};

const onClickSchools = (): void => {
  emit('change');
};

//

const selectedCategoriesValue = ref<Array<ICategory>>(selectedCategories.value);

watch(selectedCategoriesValue, () => {
  emit('update:selected-categories', selectedCategoriesValue.value);
});

watch(selectedCategories, () => {
  selectedCategoriesValue.value = selectedCategories.value;
});

const onClickResetCategories = (): void => {
  selectedCategoriesValue.value = [];
  emit('change');
};

const onClickCategories = (): void => {
  emit('change');
};

//

const selectedProfessionsValue = ref<Array<IProfession>>(selectedProfessions.value);

watch(selectedProfessionsValue, () => {
  emit('update:selected-professions', selectedProfessionsValue.value);
});

watch(selectedProfessions, () => {
  selectedProfessionsValue.value = selectedProfessions.value;
});

const onClickResetProfessions = (): void => {
  selectedProfessionsValue.value = [];
  emit('change');
};

const onClickProfessions = (): void => {
  emit('change');
};

//

const selectedTeachersValue = ref<Array<ITeacher>>(selectedTeachers.value);

watch(selectedTeachersValue, () => {
  emit('update:selected-teachers', selectedTeachersValue.value);
});

watch(selectedTeachers, () => {
  selectedTeachersValue.value = selectedTeachers.value;
});

const onClickResetTeachers = (): void => {
  selectedTeachersValue.value = [];
  emit('change');
};

const onClickTeachers = (): void => {
  emit('change');
};

//

const selectedSkillsValue = ref<Array<ISkill>>(selectedSkills.value);

watch(selectedSkillsValue, () => {
  emit('update:selected-skills', selectedSkillsValue.value);
});

watch(selectedSkills, () => {
  selectedSkillsValue.value = selectedSkills.value;
});

const onClickResetSkills = (): void => {
  selectedSkillsValue.value = [];
  emit('change');
};

const onClickSkills = (): void => {
  emit('change');
};

//

const selectedToolsValue = ref<Array<ITool>>(selectedTools.value);

watch(selectedToolsValue, () => {
  emit('update:selected-tools', selectedToolsValue.value);
});

watch(selectedTools, () => {
  selectedToolsValue.value = selectedTools.value;
});

const onClickResetTools = (): void => {
  selectedToolsValue.value = [];
  emit('change');
};

const onClickTools = (): void => {
  emit('change');
};

//

const selectedFormatValue = ref<boolean | undefined>(selectedFormat.value?.value);

watch(selectedFormatValue, () => {
  const selectedFormatValueFound = props.formats.find(
    (itm) => itm.value === selectedFormatValue.value,
  );

  emit('update:selected-format', selectedFormatValueFound || null);
});

watch(selectedFormat, () => {
  selectedFormatValue.value = selectedFormat.value?.value;
});

const onClickResetFormat = (): void => {
  selectedFormatValue.value = undefined;
  emit('change');
};

const onClickFormat = (val: string | number | boolean): void => {
  if (val !== selectedFormatValue.value) {
    emit('change');
  }
};

//

const selectedLevelsValue = ref<Array<ELevel> | undefined>(
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
  emit('change');
};

const onClickLevels = (): void => {
  emit('change');
};

</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/filters";
</style>
