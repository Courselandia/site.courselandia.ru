<template>
  <div>
    <CatalogHeader />

    <div class="catalog">
      <div class="content">
        <div class="catalog__content">
          <div class="catalog__items">
            <div class="catalog__tools">
              <CatalogTools
                v-model:sort="sort"
                v-model:type="type"
              >
                <template #filtersMobile>
                  <CatalogFiltersMobile
                    :total="total"
                    :total-filters="totalFilters"
                  />
                </template>
              </CatalogTools>
            </div>
            <div class="catalog__tags">
              <ClientOnly>
                <CatalogTags
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
                  v-model:selected-credit="selectedCredit"
                  v-model:selected-free="selectedFree"
                  :price-min="priceMin"
                  :price-max="priceMax"
                  :duration-min="durationMin"
                  :duration-max="durationMax"
                  :directions="directions"
                  :schools="schools"
                  :categories="categories"
                  :professions="professions"
                  :teachers="teachers"
                  :skills="skills"
                  :tools="tools"
                  :ratings="ratings"
                  :formats="formats"
                  :levels="levels"
                  :total-filters="totalFilters"
                  reset-all
                  @remove="onChangeFilter"
                />
              </ClientOnly>
            </div>
            <div class="catalog__courses">
              <Courses
                :courses="courses"
                :columns="3"
              />
            </div>
            <div class="catalog__pagination">
              <Pagination
                :total="total"
                :size="size"
                :page="currentPage"
                :link="getLinkPagination"
              />
            </div>
          </div>
          <div class="catalog__filter">
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
              v-model:selected-credit="selectedCredit"
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
              :available-credit="availableCredit"
              :available-free="availableFree"
              @load-items="onLoadItems"
              @change-prices="onChangePrices"
              @change-durations="onChangeDurations"
              @change="onChangeFilter"
            />
          </div>
        </div>
      </div>
    </div>

    <LazyClientOnly>
      <teleport to="#catalog-filters-mobile">
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
          v-model:selected-credit="selectedCredit"
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
          :available-credit="availableCredit"
          :available-free="availableFree"
          mobile
          @load-items="onLoadItems"
          @change-prices="onChangePrices"
          @change-durations="onChangeDurations"
          @change="onChangeFilter"
        />
      </teleport>

      <teleport to="#catalog-filters-mobile-tags">
        <CatalogTags
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
          v-model:selected-credit="selectedCredit"
          v-model:selected-free="selectedFree"
          :price-min="priceMin"
          :price-max="priceMax"
          :duration-min="durationMin"
          :duration-max="durationMax"
          :directions="directions"
          :schools="schools"
          :categories="categories"
          :professions="professions"
          :teachers="teachers"
          :skills="skills"
          :tools="tools"
          :ratings="ratings"
          :formats="formats"
          :levels="levels"
          :total-filters="totalFilters"
          @remove="onChangeFilter"
        />
      </teleport>
    </LazyClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import {
  computed,
  ref,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';

import { apiReadCategories } from '@/api/category';
import { apiReadCourses } from '@/api/course';
import { apiReadProfessions } from '@/api/profession';
import { apiReadSkills } from '@/api/skill';
import { apiReadTeachers } from '@/api/teacher';
import { apiReadTools } from '@/api/tool';
import Pagination from '@/components/atoms/Pagination.vue';
import CatalogFilters from '@/components/molecules/CatalogFilters.vue';
import CatalogFiltersMobile from '@/components/molecules/CatalogFiltersMobile.vue';
import CatalogTags from '@/components/molecules/CatalogTags.vue';
import CatalogTools from '@/components/molecules/CatalogTools.vue';
import Courses from '@/components/molecules/Courses.vue';
import CatalogHeader from '@/components/organism/CatalogHeader.vue';
import {
  courseFilterStoreCategoriesToComponentCategories,
} from '@/converts/courseFilterStoreCategoriesToComponentCategories';
import {
  courseFilterStoreDirectionsToComponentDirections,
} from '@/converts/courseFilterStoreDirectionsToComponentDirections';
import {
  courseFilterStoreProfessionsToComponentProfessions,
} from '@/converts/courseFilterStoreProfessionsToComponentProfessions';
import { courseFilterStoreSchoolsToComponentSchools } from '@/converts/courseFilterStoreSchoolsToComponentSchools';
import { courseFilterStoreSkillsToComponentSkills } from '@/converts/courseFilterStoreSkillsToComponentSkills';
import { courseFilterStoreTeachersToComponentTeachers } from '@/converts/courseFilterStoreTeachersToComponentTeachers';
import { courseFilterStoreToolsToComponentTools } from '@/converts/courseFilterStoreToolsToComponentTools';
import { coursesStoreToCoursesComponent } from '@/converts/coursesStoreToCoursesComponent';
import ECourseSort from '@/enums/components/molecules/courseSort';
import ECourseType from '@/enums/components/molecules/courseType';
import ELevel from '@/enums/components/molecules/level';
import EFormat from '@/enums/stores/course/format';
import {
  countCategories,
  countLevels,
  countProfessions,
  countSchools,
  countSkills,
  countTeachers,
  countTools,
  hasDirection,
  hasFormat,
  hasRating,
} from '@/helpers/chekFilter';
import IApiReadCourses from '@/interfaces/api/course/apiReadCourses';
import ICatalogFilterSelectItem from '@/interfaces/components/molecules/catalogFilterSelectItem';
import ICategory from '@/interfaces/components/molecules/category';
import ICourse from '@/interfaces/components/molecules/course';
import IDirection from '@/interfaces/components/molecules/direction';
import IFormat from '@/interfaces/components/molecules/format';
import ILevel from '@/interfaces/components/molecules/level';
import IProfession from '@/interfaces/components/molecules/profession';
import IRating from '@/interfaces/components/molecules/rating';
import ISchool from '@/interfaces/components/molecules/schoolFilter';
import ISkill from '@/interfaces/components/molecules/skill';
import ITeacher from '@/interfaces/components/molecules/teacher';
import ITool from '@/interfaces/components/molecules/tool';
import IFilters from '@/interfaces/filters';
import ISorts from '@/interfaces/sorts';
import ICategoryLink from '@/interfaces/stores/course/categoryLink';
import IDirectionLink from '@/interfaces/stores/course/directionLink';
import IProfessionLink from '@/interfaces/stores/course/professionLink';
import IRatingStore from '@/interfaces/stores/course/rating';
import ISchoolLink from '@/interfaces/stores/course/schoolLink';
import ISkillLink from '@/interfaces/stores/course/skillLink';
import ITeacherLink from '@/interfaces/stores/course/teacherLink';
import IToolLink from '@/interfaces/stores/course/toolLink';
import category from '@/stores/category';
import direction from '@/stores/direction';
import profession from '@/stores/profession';
import school from '@/stores/school';
import skill from '@/stores/skill';
import teacher from '@/stores/teacher';
import tool from '@/stores/tool';
import TValue from '@/types/value';

const props = defineProps({
  section: {
    type: String,
    required: false,
    default: null,
  },
});

const route = useRoute();
let { link } = route.params;
let section = props.section || null;

const { itemLinkCategory } = storeToRefs(category());
const { itemLinkDirection } = storeToRefs(direction());
const { itemLinkProfession } = storeToRefs(profession());
const { itemLinkSchool } = storeToRefs(school());
const { itemLinkSkill } = storeToRefs(skill());
const { itemLinkTeacher } = storeToRefs(teacher());
const { itemLinkTool } = storeToRefs(tool());

const openedItems: Record<string, boolean> = {
  openedSchools: false,
  openedCategories: false,
  openedProfessions: false,
  openedTeachers: false,
  openedSkills: false,
  openedTools: false,
};

const getUrlFilterQuery = (name: string): Array<string> => {
  const { query } = route;
  let foundResult: Array<string> = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const key in query) {
    if (key.indexOf('filters[') !== -1 && key.indexOf(']') !== -1) {
      const value = query[key] as string;
      let resultValue: Array<string> = [];

      if (value?.indexOf(',') && value?.split(',').length > 1) {
        resultValue = value.split(',');
      } else if (value) {
        resultValue = [value];
      }

      const regex = /\[([A-Za-z0-9_.-]+)\]/;
      const found = key.match(regex);

      if (found?.length && found[1] && found[1] === name) {
        foundResult = resultValue;

        break;
      }
    }
  }

  return foundResult;
};

const getUrlQuery = (name: string): string | null => {
  const { query } = route;

  if (query[name]) {
    return query[name] as string;
  }

  return null;
};

const sort = ref<TValue>(ECourseSort.ALPHABETIC);
const valueQuery = getUrlQuery('sort');

if (valueQuery && Object.values(ECourseSort).includes(valueQuery as ECourseSort)) {
  sort.value = valueQuery;
}

const type = ref<TValue>(ECourseType.TILE);

const courses = ref<ICourse[]>([]);

const total = ref(0);
const currentPage = ref(Number(getUrlQuery('page')) || 1);
const size = ref(36);

//

const selectedCredit = ref(false);
const availableCredit = ref(true);
const selectedFree = ref(false);
const availableFree = ref(true);

//

const priceMin = ref(0);
const priceMax = ref(0);
const priceStep = ref(1000);
const selectedPrices = ref<Array<number>>([priceMin.value, priceMax.value]);

//

const durationMin = ref(0);
const durationMax = ref(62);
const durationStep = ref(1);
const selectedDurations = ref<Array<number>>([durationMin.value, durationMax.value]);

//

const directions = ref<IDirection[]>([]);
const selectedDirection = ref<IDirection | null>();
const schools = ref<ISchool[]>([]);
const categories = ref<ICategory[]>([]);
const professions = ref<IProfession[]>([]);
const teachers = ref<ITeacher[]>([]);
const skills = ref<ISkill[]>([]);
const tools = ref<ITool[]>([]);

const selectedFormat = ref<IFormat | null>();
const formats = ref<IFormat[]>([]);

//

const selectedLevels = ref<Array<ILevel>>([]);
const levels = ref<ILevel[]>([]);

//

const ratings = ref<IRating[]>([]);
const selectedRating = ref<IRating | null>();
const selectedSchools = ref<Array<ISchool>>([]);
const selectedCategories = ref<Array<ICategory>>([]);
const selectedProfessions = ref<Array<IProfession>>([]);
const selectedTeachers = ref<Array<ITeacher>>([]);
const selectedSkills = ref<Array<ISkill>>([]);
const selectedTools = ref<Array<ITool>>([]);

const getLinkPagination = (page: number): string => `/courses?page=${page}`;

const totalFilters = computed((): number => {
  let count = 0;

  if (selectedDirection.value && hasDirection(directions.value, selectedDirection.value)) {
    count++;
  }

  if (selectedRating.value && hasRating(ratings.value, selectedRating.value?.value)) {
    count++;
  }

  if (selectedFormat.value && hasFormat(formats.value, selectedFormat.value)) {
    count++;
  }

  if (selectedCredit.value) {
    count++;
  }

  if (selectedFree.value) {
    count++;
  }

  if (
    !selectedFree.value
    && (
      selectedPrices.value[0] !== priceMin.value
      || selectedPrices.value[1] !== priceMax.value
    )
  ) {
    count++;
  }

  if (
    selectedDurations.value[0] !== durationMin.value
    || selectedDurations.value[1] !== durationMax.value
  ) {
    count++;
  }

  count += countSchools(schools.value, selectedSchools.value);
  count += countCategories(categories.value, selectedCategories.value);
  count += countProfessions(professions.value, selectedProfessions.value);
  count += countTeachers(teachers.value, selectedTeachers.value);
  count += countSkills(skills.value, selectedSkills.value);
  count += countTools(tools.value, selectedTools.value);
  count += countLevels(levels.value, selectedLevels.value.map((itm) => itm.value));

  return count;
});

const getFormats = (formatValues: Array<EFormat>): Array<IFormat> => {
  const result: Array<IFormat> = [];

  formatValues.forEach((val) => {
    if (val === EFormat.ONLINE) {
      result[result.length] = {
        label: 'Онлайн',
        value: true,
      };
    }

    if (val === EFormat.OFFLINE) {
      result[result.length] = {
        label: 'Офлайн',
        value: false,
      };
    }
  });

  return result;
};

const getLevels = (lvls: Array<ELevel>): Array<ILevel> => [
  {
    label: 'Для начинающих',
    value: ELevel.JUNIOR,
    disabled: lvls.indexOf(ELevel.JUNIOR) === -1,
  },
  {
    label: 'Для продвинутых',
    value: ELevel.MIDDLE,
    disabled: lvls.indexOf(ELevel.MIDDLE) === -1,
  },
  {
    label: 'Для профессионалов',
    value: ELevel.SENIOR,
    disabled: lvls.indexOf(ELevel.SENIOR) === -1,
  },
];

const getRatings = (rtgs: Array<IRatingStore>): Array<IRating> => {
  const result: Array<IRating> = [];

  rtgs.forEach((itm) => {
    result[result.length] = {
      label: `${itm.label} и выше`,
      value: itm.label,
      disabled: itm.disabled,
    };
  });

  return result;
};

const config = useRuntimeConfig();

const setMeta = (): void => {
  let title = 'Каталог онлайн курсов от Courselandia';

  if (section === 'direction' && itemLinkDirection.value?.metatag?.title) {
    title = itemLinkDirection.value.metatag.title;
  } else if (section === 'category' && itemLinkCategory.value?.metatag?.title) {
    title = itemLinkCategory.value?.metatag?.title;
  } else if (section === 'profession' && itemLinkProfession.value?.metatag?.title) {
    title = itemLinkProfession.value?.metatag?.title;
  } else if (section === 'school' && itemLinkSchool.value?.metatag?.title) {
    title = itemLinkSchool.value?.metatag?.title;
  } else if (section === 'skill' && itemLinkSkill.value?.metatag?.title) {
    title = itemLinkSkill.value?.metatag?.title;
  } else if (section === 'teacher' && itemLinkTeacher.value?.metatag?.title) {
    title = itemLinkTeacher.value?.metatag?.title;
  } else if (section === 'tool' && itemLinkTool.value?.metatag?.title) {
    title = itemLinkTool.value?.metatag?.title;
  }

  let description = 'Каталог курсов от ведущих онлайн школ по разным направлениям. Удобный поиск по профессиям, направлениям, инструментам и навыкам. Найди свой курс быстро и легко.';

  if (section === 'direction' && itemLinkDirection.value?.metatag?.description) {
    description = itemLinkDirection.value.metatag.description;
  } else if (section === 'category' && itemLinkCategory.value?.metatag?.description) {
    description = itemLinkCategory.value?.metatag?.description;
  } else if (section === 'profession' && itemLinkProfession.value?.metatag?.description) {
    description = itemLinkProfession.value?.metatag?.description;
  } else if (section === 'school' && itemLinkSchool.value?.metatag?.description) {
    description = itemLinkSchool.value?.metatag?.description;
  } else if (section === 'skill' && itemLinkSkill.value?.metatag?.description) {
    description = itemLinkSkill.value?.metatag?.description;
  } else if (section === 'teacher' && itemLinkTeacher.value?.metatag?.description) {
    description = itemLinkTeacher.value?.metatag?.description;
  } else if (section === 'tool' && itemLinkTool.value?.metatag?.description) {
    description = itemLinkTool.value?.metatag?.description;
  }

  useHead({
    title,
    meta: [
      {
        name: 'description',
        content: description,
      },
    ],
  });
};

const setHeader = (result: IApiReadCourses): void => {
  itemLinkDirection.value = null;
  itemLinkCategory.value = null;
  itemLinkProfession.value = null;
  itemLinkSchool.value = null;
  itemLinkSkill.value = null;
  itemLinkTeacher.value = null;
  itemLinkTool.value = null;

  if (result.description) {
    if (section === 'direction') {
      itemLinkDirection.value = result.description as IDirectionLink;
    } else if (section === 'category') {
      itemLinkCategory.value = result.description as ICategoryLink;
    } else if (section === 'profession') {
      itemLinkProfession.value = result.description as IProfessionLink;
    } else if (section === 'school') {
      itemLinkSchool.value = result.description as ISchoolLink;
    } else if (section === 'skill') {
      itemLinkSkill.value = result.description as ISkillLink;
    } else if (section === 'teacher') {
      itemLinkTeacher.value = result.description as ITeacherLink;
    } else if (section === 'tool') {
      itemLinkTool.value = result.description as IToolLink;
    }
  }
};

const setCoursesAndFilters = (result: IApiReadCourses): void => {
  courses.value = coursesStoreToCoursesComponent(result.courses);
  total.value = result.total || 0;

  const storeDirections = result.filter?.directions || [];
  directions.value = courseFilterStoreDirectionsToComponentDirections(storeDirections);

  const storeCategories = result.filter?.categories || [];
  categories.value = courseFilterStoreCategoriesToComponentCategories(storeCategories);

  const storeProfessions = result.filter?.professions || [];
  professions.value = courseFilterStoreProfessionsToComponentProfessions(storeProfessions);

  const storeSchools = result.filter?.schools || [];
  schools.value = courseFilterStoreSchoolsToComponentSchools(storeSchools);

  const storeSkills = result.filter?.skills || [];
  skills.value = courseFilterStoreSkillsToComponentSkills(storeSkills);

  const storeTeachers = result.filter?.teachers || [];
  teachers.value = courseFilterStoreTeachersToComponentTeachers(storeTeachers);

  const storeTools = result.filter?.tools || [];
  tools.value = courseFilterStoreToolsToComponentTools(storeTools);

  availableCredit.value = result.filter?.credit === undefined ? true : result.filter?.credit;
  availableFree.value = result.filter?.free === undefined ? true : result.filter?.free;

  let toSetupPrice = false;

  if (
    priceMin.value === selectedPrices.value[0]
    && priceMax.value === selectedPrices.value[1]
  ) {
    toSetupPrice = true;
  }

  priceMin.value = result.filter?.price.min || 0;
  priceMax.value = result.filter?.price.max || 0;

  if (toSetupPrice) {
    selectedPrices.value = [priceMin.value, priceMax.value];
  }

  let toSetupDuration = false;

  if (
    durationMin.value === selectedDurations.value[0]
    && durationMax.value === selectedDurations.value[1]
  ) {
    toSetupDuration = true;
  }

  durationMin.value = result.filter?.duration.min || 0;
  durationMax.value = result.filter?.duration.max || 0;

  if (toSetupDuration) {
    selectedDurations.value = [durationMin.value, durationMax.value];
  }

  formats.value = getFormats(result.filter?.formats || []);

  levels.value = getLevels(result.filter?.levels || []);
  ratings.value = getRatings(result.filter?.ratings || []);
};

const setSelectedFiltersByQuery = (): void => {
  if (section === 'direction') {
    if (itemLinkDirection.value?.id) {
      selectedDirection.value = {
        id: itemLinkDirection.value?.id,
      };
    }
  }

  if (section === 'school') {
    if (itemLinkSchool.value?.id) {
      selectedSchools.value = [
        {
          id: itemLinkSchool.value?.id,
        },
      ];
    }
  }

  if (section === 'category') {
    if (itemLinkCategory.value?.id) {
      selectedCategories.value[0] = {
        id: itemLinkCategory.value?.id,
      };
    }
  }

  if (section === 'profession') {
    if (itemLinkProfession.value?.id) {
      selectedProfessions.value[0] = {
        id: itemLinkProfession.value?.id,
      };
    }
  }

  if (section === 'teacher') {
    if (itemLinkTeacher.value?.id) {
      selectedTeachers.value[0] = {
        id: itemLinkTeacher.value?.id,
      };
    }
  }

  if (section === 'skill') {
    if (itemLinkSkill.value?.id) {
      selectedSkills.value[0] = {
        id: itemLinkSkill.value?.id,
      };
    }
  }

  if (section === 'tool') {
    if (itemLinkTool.value?.id) {
      selectedTools.value[0] = {
        id: itemLinkTool.value?.id,
      };
    }
  }

  if (getUrlFilterQuery('direction')?.length) {
    selectedDirection.value = {
      id: Number(getUrlFilterQuery('direction')[0]),
    };
  }

  if (getUrlFilterQuery('rating')?.length) {
    selectedRating.value = {
      value: Number(getUrlFilterQuery('rating')[0]),
      disabled: false,
    };
  }

  if (getUrlFilterQuery('price')?.length === 2) {
    const price = getUrlFilterQuery('price').map((itm) => Number(itm));
    price[0] = price[0] >= 0 ? price[0] : 0;
    selectedPrices.value = price;
  }

  if (getUrlFilterQuery('credit')?.length) {
    selectedCredit.value = Boolean(getUrlFilterQuery('credit')[0]);
  }

  if (getUrlFilterQuery('free')?.length) {
    selectedFree.value = Boolean(getUrlFilterQuery('free')[0]);
  }

  if (getUrlFilterQuery('duration')?.length === 2) {
    const duration = getUrlFilterQuery('duration').map((itm) => Number(itm));
    duration[0] = duration[0] >= 0 ? duration[0] : 0;
    selectedDurations.value = duration;
  }

  if (getUrlFilterQuery('schools')?.length) {
    selectedSchools.value = selectedSchools.value.concat(getUrlFilterQuery('schools').map((itm) => ({
      id: Number(itm),
    })));
  }

  if (getUrlFilterQuery('categories')?.length) {
    selectedCategories.value = selectedCategories.value.concat(getUrlFilterQuery('categories').map((itm) => ({
      id: Number(itm),
    })));
  }

  if (getUrlFilterQuery('professions')?.length) {
    selectedProfessions.value = selectedProfessions.value.concat(getUrlFilterQuery('professions').map((itm) => ({
      id: Number(itm),
    })));
  }

  if (getUrlFilterQuery('skills')?.length) {
    selectedSkills.value = selectedSkills.value.concat(getUrlFilterQuery('skills').map((itm) => ({
      id: Number(itm),
    })));
  }

  if (getUrlFilterQuery('teachers')?.length) {
    selectedTeachers.value = selectedTeachers.value.concat(getUrlFilterQuery('teachers').map((itm) => ({
      id: Number(itm),
    })));
  }

  if (getUrlFilterQuery('tools')?.length) {
    selectedTools.value = selectedTools.value.concat(getUrlFilterQuery('tools').map((itm) => ({
      id: Number(itm),
    })));
  }

  if (getUrlFilterQuery('online')?.length) {
    selectedFormat.value = {
      value: Boolean(getUrlFilterQuery('online')[0]),
    };
  }

  if (getUrlFilterQuery('levels')?.length) {
    selectedLevels.value = getUrlFilterQuery('levels').map((level) => ({
      value: level as ELevel,
      disabled: false,
    }));
  }
};

const load = async (
  pageValue: number = 0,
  sizeValue: number = 36,
  sorts: ISorts | null = null,
  filterCurrent: IFilters | null = null,
): Promise<void> => {
  try {
    const pageValueCurrent = pageValue !== 0 ? pageValue - 1 : pageValue;

    const result = await apiReadCourses(
      config.public.apiUrl,
      pageValueCurrent * sizeValue,
      sizeValue,
      sorts,
      filterCurrent,
      openedItems,
      section,
      link as string,
    );

    setCoursesAndFilters(result);
    setHeader(result);
    setMeta();
  } catch (error: any) {
    console.log(error.message);
  }
};

const getSort = (val: TValue): ISorts => {
  const sorts: ISorts = {};

  if (val === ECourseSort.ALPHABETIC) {
    sorts.header = 'ASC';
  } else if (val === ECourseSort.DATE) {
    sorts.id = 'DESC';
  } else if (val === ECourseSort.RATING) {
    sorts.rating = 'DESC';
  } else if (val === ECourseSort.PRICE_ASC) {
    sorts.price = 'ASC';
  } else if (val === ECourseSort.PRICE_DESC) {
    sorts.price = 'DESC';
  } else if (val === ECourseSort.RELEVANCY) {
    sorts.relevance = 'DESC';
  }

  return sorts;
};

const getFilters = (): IFilters => {
  const filters: IFilters = {};

  if (selectedDirection.value?.id) {
    filters['directions-id'] = selectedDirection.value.id;
  }

  if (selectedRating.value?.value) {
    filters.rating = selectedRating.value?.value;
  }

  if (selectedSchools.value?.length) {
    filters['school-id'] = selectedSchools.value.map((item) => item.id);
  }

  if (selectedCategories.value?.length) {
    filters['categories-id'] = selectedCategories.value.map((item) => item.id);
  }

  if (selectedProfessions.value?.length) {
    filters['professions-id'] = selectedProfessions.value.map((item) => item.id);
  }

  if (selectedTeachers.value?.length) {
    filters['teachers-id'] = selectedTeachers.value.map((item) => item.id);
  }

  if (selectedSkills.value?.length) {
    filters['skills-id'] = selectedSkills.value.map((item) => item.id);
  }

  if (selectedTools.value?.length) {
    filters['tools-id'] = selectedTools.value.map((item) => item.id);
  }

  if (selectedFormat.value?.value === true || selectedFormat.value?.value === false) {
    filters.online = selectedFormat.value.value;
  }

  if (selectedLevels.value?.length) {
    filters['levels-level'] = selectedLevels.value.map((item) => item.value);
  }

  if (selectedPrices.value?.length
    && (
      selectedPrices.value[0] !== priceMin.value
      || selectedPrices.value[1] !== priceMax.value
    )
    && !selectedFree.value
  ) {
    filters.price = [selectedPrices.value[0], selectedPrices.value[1]];
  }

  if (selectedDurations.value?.length
    && (
      selectedDurations.value[0] !== durationMin.value
      || selectedDurations.value[1] !== durationMax.value
    )
  ) {
    filters.duration = [selectedDurations.value[0], selectedDurations.value[1]];
  }

  if (selectedCredit.value) {
    filters.credit = true;
  }

  if (selectedFree.value) {
    filters.free = true;
  }

  return filters;
};

const onLoadItems = async (name: string, callback?: Function): Promise<void> => {
  if (name === 'professions') {
    if (professions.value.length <= 11) {
      const result = await apiReadProfessions(config.public.apiUrl, null, null, getFilters());
      professions.value = courseFilterStoreProfessionsToComponentProfessions(result);
    }

    openedItems.openedProfessions = true;

    if (callback) {
      callback();
    }
  } else if (name === 'categories') {
    if (categories.value.length <= 11) {
      const result = await apiReadCategories(config.public.apiUrl, null, null, getFilters());
      categories.value = courseFilterStoreCategoriesToComponentCategories(result);
    }

    openedItems.openedCategories = true;

    if (callback) {
      callback();
    }
  } else if (name === 'teachers') {
    if (teachers.value.length <= 11) {
      const result = await apiReadTeachers(config.public.apiUrl, null, null, getFilters());
      teachers.value = courseFilterStoreTeachersToComponentTeachers(result);
    }

    openedItems.openedTeachers = true;

    if (callback) {
      callback();
    }
  } else if (name === 'skills') {
    if (skills.value.length <= 11) {
      const result = await apiReadSkills(config.public.apiUrl, null, null, getFilters());
      skills.value = courseFilterStoreSkillsToComponentSkills(result);
    }

    openedItems.openedSkills = true;

    if (callback) {
      callback();
    }
  } else if (name === 'tools') {
    if (tools.value.length <= 11) {
      const result = await apiReadTools(config.public.apiUrl, null, null, getFilters());
      tools.value = courseFilterStoreToolsToComponentTools(result);
    }

    openedItems.openedTools = true;

    if (callback) {
      callback();
    }
  }
};

try {
  setSelectedFiltersByQuery();
  const pageValueCurrent = currentPage.value !== 0 ? currentPage.value - 1 : currentPage.value;

  const result = await apiReadCourses(
    config.public.apiUrl,
    pageValueCurrent * size.value,
    size.value,
    getSort(sort.value),
    getFilters(),
  );
  setCoursesAndFilters(result);
} catch (error: any) {
  console.log(error.message);
}

//

const setUrlQuery = (
  pageValue: number = 0,
  sortsCurrent: ISorts | null = null,
  filtersCurrent: IFilters | null = null,
): void => {
  const queryFilterNames: Record<string, string> = {
    'directions-id': 'direction',
    'school-id': 'schools',
    'categories-id': 'categories',
    'professions-id': 'professions',
    'teachers-id': 'teachers',
    'skills-id': 'skills',
    'tools-id': 'tools',
    'levels-level': 'levels',
  };

  const sectionNames: Record<string, string> = {
    'directions-id': 'direction',
    'school-id': 'school',
    'categories-id': 'category',
    'professions-id': 'profession',
    'teachers-id': 'teacher',
    'skills-id': 'skill',
    'tools-id': 'tool',
    'levels-level': 'level',
  };

  const convertNameFilterToSection = (name: string): string => sectionNames[name] || name;
  const convertNameFilterToFilterQuery = (name: string): string => queryFilterNames[name] || name;

  const convertSectionFilterToName = (
    name: string,
  ): string | null => Object.keys(sectionNames).find((key) => sectionNames[key] === name) || null;

  const getUrlWithQuery = (sectionValue?: string, linkValue?: string): string => {
    const queries: Array<string> = [];

    queries.push(`page=${encodeURIComponent(pageValue)}`);

    if (sortsCurrent) {
      if (sortsCurrent.header === 'ASC') {
        queries.push('sort=alphabetic');
      } else if (sortsCurrent.id === 'DESC') {
        queries.push('sort=date');
      } else if (sortsCurrent.rating === 'DESC') {
        queries.push('sort=rating');
      } else if (sortsCurrent.price === 'ASC') {
        queries.push('sort=price_asc');
      } else if (sortsCurrent.price === 'DESC') {
        queries.push('sort=price_desc');
      } else if (sortsCurrent.relevance === 'DESC') {
        queries.push('sort=relevance');
      }
    }

    if (filtersCurrent) {
      Object.keys(filtersCurrent).forEach((name) => {
        if (
          filtersCurrent[name]
          && (
            !sectionValue || convertSectionFilterToName(sectionValue) !== name
          )
        ) {
          const nameParameter = `filters[${encodeURIComponent(convertNameFilterToFilterQuery(name))}]`;

          if (typeof filtersCurrent[name] === 'string' || typeof filtersCurrent[name] === 'number') {
            queries.push(`${nameParameter}=${filtersCurrent[name]}`);
          } else if (typeof filtersCurrent[name] === 'boolean') {
            queries.push(`${nameParameter}=${filtersCurrent[name] ? 1 : 0}`);
          } else if (Array.isArray(filtersCurrent[name])) {
            const items = filtersCurrent[name] as Array<string | number | boolean>;
            const values = items.join(',');
            queries.push(`${nameParameter}=${values}`);
          }
        }
      });
    }

    const query = queries.join('&');

    let url = '/courses';

    if (sectionValue && linkValue) {
      url += `/${sectionValue}/${linkValue}`;
    }

    if (query) {
      url = `${url}?${query}`;
    }

    return url;
  };

  const filterSectionNames: Record<string, Array<ICatalogFilterSelectItem | IDirection>> = {
    'directions-id': directions.value,
    'school-id': schools.value,
    'categories-id': categories.value,
    'professions-id': professions.value,
    'teachers-id': teachers.value,
    'skills-id': skills.value,
    'tools-id': tools.value,
  };

  const getSectionFilter = (): { name: string, link: string } | null => {
    if (filtersCurrent) {
      let result: any = null;

      Object.keys(filterSectionNames).forEach((name) => {
        if (!result && filtersCurrent[name]) {
          if (Array.isArray(filtersCurrent[name])) {
            const checkFilters = filtersCurrent[name] as Array<number>;

            if (checkFilters.length === 1) {
              const foundItem = filterSectionNames[name].find((itm) => itm.id === checkFilters[0]);

              if (foundItem) {
                result = {
                  name: convertNameFilterToSection(name) || '',
                  link: foundItem.link || '',
                };
              }
            }
          } else {
            const checkFilters = filtersCurrent[name] as number;
            const foundItem = filterSectionNames[name].find((itm) => itm.id === checkFilters);

            if (foundItem) {
              result = {
                name: convertNameFilterToSection(name) || '',
                link: foundItem.link || '',
              };
            }
          }
        }
      });

      return result;
    }

    return null;
  };

  if (filtersCurrent) {
    let url = '';

    if (!section && !link) {
      const filterSection = getSectionFilter();

      if (filterSection) {
        section = filterSection.name;
        link = filterSection.link;

        url = getUrlWithQuery(section || '', link);
      } else {
        url = getUrlWithQuery();
      }
    } else if (section) {
      const sectionFilterName = convertSectionFilterToName(section);

      if (sectionFilterName && link) {
        const filterSection = getSectionFilter();

        if (filterSection) {
          section = filterSection.name;
          link = filterSection.link;
          url = getUrlWithQuery(section || '', link);
        } else {
          url = getUrlWithQuery();
          section = null;
          link = '';
        }
      }
    }

    window.history.pushState(
      {},
      '',
      url,
    );
  }
};

const onFilterAndSort = async (): Promise<void> => {
  const filters: IFilters = getFilters();

  setUrlQuery(currentPage.value, getSort(sort.value), filters);
  await load(currentPage.value, size.value, getSort(sort.value), filters);
};

const onChangePrices = (): void => {
  window.setTimeout(() => {
    onFilterAndSort();
  }, 200);
};

const onChangeDurations = (): void => {
  window.setTimeout(() => {
    onFilterAndSort();
  }, 200);
};

const onChangeFilter = () => {
  window.setTimeout(() => {
    onFilterAndSort();
  }, 50);
};

watch(sort, () => {
  onFilterAndSort();
});

setMeta();
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/catalog.scss";
</style>
