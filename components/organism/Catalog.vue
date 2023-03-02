<template>
  <div>
    <CatalogHeader>
      <template #title>
        Онлайн курсы по Дизайну
      </template>
      <template #description>
        Пройдя курсы от лучших онлайн-школ, вы научитесь моделировать и
        визуализировать 3D-объекты, создавать дизайн одежды, интерьеров
        или даже проектировать дизайны различных торговых центров,
        скверов и парков, анимировать картинки, разрабатывать UX/UI-дизайн
        и дизайн мобильных приложений, а также многое другое.
      </template>
      <template #section>
        <div class="catalog-header__fire" />
        <div class="catalog-header__label">
          Сейчас в тренде
        </div>
      </template>
      <template #tags>
        <Tags>
          <Tag
            to="/courses/programmer"
            bck="white"
            shadow
          >
            Программирование
          </Tag>
          <Tag
            to="/courses/marketing"
            bck="white"
            shadow
          >
            Маркетинг
          </Tag>
          <Tag
            to="/courses/marketing"
            bck="white"
            shadow
          >
            Дизайн
          </Tag>
          <Tag
            to="/courses/marketing"
            bck="white"
            shadow
          >
            Бизнес и управление
          </Tag>
          <Tag
            to="/courses/marketing"
            bck="white"
            shadow
          >
            Аналитика
          </Tag>
          <Tag
            to="/courses/marketing"
            bck="white"
            shadow
          >
            Игры
          </Tag>
        </Tags>
      </template>
    </CatalogHeader>

    <CatalogHeader>
      <template #title>
        Онлайн курсы школы Skillbox
      </template>
      <template #description>
        Skillbox — это одна из крупнейших образовательных платформ на российском рынке.
        Она предоставляет более 500 образовательных курсов по различным тематикам,
        начиная с программирования и аналитики и заканчивая модой и флористикой.
      </template>
      <template #rating>
        4.5
      </template>
      <template #reviews>
        <nuxt-link to="/">
          1236 отзывов
        </nuxt-link>
      </template>
      <template #image>
        <img src="https://loc-api.courselandia.ru/storage/uploaded/images/schools/1.png" alt="" title="" />
      </template>
      <template #teachers>
        2300
      </template>
      <template #action>
        <Button
          to="/"
          link="link"
          target="_blank"
        >
          Перейти на сайт
        </Button>
      </template>
    </CatalogHeader>

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
                :ratings="ratings"
                :formats="formats"
                :levels="levels"
                reset-all
              />
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
            <ClientOnly>
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
              />
            </ClientOnly>
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
          :ratings="ratings"
          :formats="formats"
          :levels="levels"
        />
      </teleport>
    </LazyClientOnly>
  </div>
</template>

<script lang="ts" setup>
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
import Button from '@/components/atoms/Button.vue';
import Pagination from '@/components/atoms/Pagination.vue';
import Tag from '@/components/atoms/Tag.vue';
import CatalogFilters from '@/components/molecules/CatalogFilters.vue';
import CatalogFiltersMobile from '@/components/molecules/CatalogFiltersMobile.vue';
import CatalogHeader from '@/components/molecules/CatalogHeader.vue';
import CatalogTags from '@/components/molecules/CatalogTags.vue';
import CatalogTools from '@/components/molecules/CatalogTools.vue';
import Courses from '@/components/molecules/Courses.vue';
import Tags from '@/components/molecules/Tags.vue';
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
import IApiReadCourses from '@/interfaces/api/course/apiReadCourses';
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
import TValue from '@/types/value';

const route = useRoute();
const sort = ref<TValue>(route.query.sort as TValue || ECourseSort.DATE);
const type = ref<TValue>(ECourseType.TILE);

const courses = ref<ICourse[]>([]);

const total = ref(0);
const offset = ref(0);
const size = ref(36);
const currentPage = ref(1);

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

const getLinkPagination = (page: number): string => `/courses/?page=${page}`;

const totalFilters = computed((): number => {
  let count = 0;

  if (selectedDirection.value) {
    count++;
  }

  if (selectedRating.value) {
    count++;
  }

  if (selectedFormat.value) {
    count++;
  }

  if (selectedCredit.value) {
    count++;
  }

  if (selectedFree.value) {
    count++;
  }

  if (
    selectedPrices.value[0] !== priceMin.value
    || selectedPrices.value[1] !== priceMax.value
  ) {
    count++;
  }

  if (
    selectedDurations.value[0] !== durationMin.value
    || selectedDurations.value[1] !== durationMax.value
  ) {
    count++;
  }

  count += selectedSchools.value.length;
  count += selectedCategories.value.length;
  count += selectedProfessions.value.length;
  count += selectedTeachers.value.length;
  count += selectedSkills.value.length;
  count += selectedTools.value.length;
  count += selectedTools.value.length;
  count += selectedLevels.value.length;

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

const getLevels = (lvls: Array<ELevel>): Array<ILevel> => {
  const result: Array<ILevel> = [];

  if (lvls.indexOf(ELevel.JUNIOR) !== -1) {
    result[result.length] = {
      label: 'Для начинающих',
      value: ELevel.JUNIOR,
    };
  }

  if (lvls.indexOf(ELevel.MIDDLE) !== -1) {
    result[result.length] = {
      label: 'Для продвинутых',
      value: ELevel.MIDDLE,
    };
  }

  if (lvls.indexOf(ELevel.SENIOR) !== -1) {
    result[result.length] = {
      label: 'Для профессионалов',
      value: ELevel.SENIOR,
    };
  }

  return result;
};

const getRatings = (rtgs: Array<number>): Array<IRating> => {
  const result: Array<IRating> = [];

  if (rtgs.indexOf(4.5) !== -1) {
    result[result.length] = {
      label: '4.5 и выше',
      value: 4.5,
    };
  }

  if (rtgs.indexOf(4) !== -1) {
    result[result.length] = {
      label: '4.0 и выше',
      value: 4,
    };
  }

  if (rtgs.indexOf(3.5) !== -1) {
    result[result.length] = {
      label: '3.5 и выше',
      value: 3.5,
    };
  }

  if (rtgs.indexOf(3) !== -1) {
    result[result.length] = {
      label: '3.0 и выше',
      value: 3,
    };
  }

  return result;
};

const config = useRuntimeConfig();

const setCoursesAndFilters = (
  result: IApiReadCourses,
  setupPrices = true,
  setupDurations = true,
): void => {
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

  availableCredit.value = result.filter?.credit || true;
  availableFree.value = result.filter?.free || true;

  priceMin.value = result.filter?.price.min || 0;
  priceMax.value = result.filter?.price.max || 0;

  if (setupPrices) {
    selectedPrices.value = [priceMin.value, priceMax.value];
  }

  durationMin.value = result.filter?.duration.min || 0;
  durationMax.value = result.filter?.duration.max || 0;

  if (setupDurations) {
    selectedDurations.value = [durationMin.value, durationMax.value];
  }

  formats.value = getFormats(result.filter?.formats || []);

  levels.value = getLevels(result.filter?.levels || []);
  ratings.value = getRatings(result.filter?.ratings || []);
};

const load = async (
  offsetCurrent: number = 0,
  totalCurrent: number = 36,
  sorts: ISorts | null = null,
  filterCurrent: IFilters | null = null,
  setupPrices = true,
  setupDurations = true,
): Promise<void> => {
  try {
    const result = await apiReadCourses(
      config.public.apiUrl,
      offsetCurrent,
      totalCurrent,
      sorts,
      filterCurrent,
    );

    setCoursesAndFilters(result, setupPrices, setupDurations);
  } catch (error: any) {
    console.log(error.message);
  }
};

const onLoadItems = async (name: string, callback?: Function): Promise<void> => {
  if (name === 'professions') {
    if (professions.value.length <= 11) {
      const result = await apiReadProfessions(config.public.apiUrl);
      professions.value = courseFilterStoreProfessionsToComponentProfessions(result);
    }

    if (callback) {
      callback();
    }
  } else if (name === 'categories') {
    if (categories.value.length <= 11) {
      const result = await apiReadCategories(config.public.apiUrl);
      categories.value = courseFilterStoreCategoriesToComponentCategories(result);
    }

    if (callback) {
      callback();
    }
  } else if (name === 'teachers') {
    if (teachers.value.length <= 11) {
      const result = await apiReadTeachers(config.public.apiUrl);
      teachers.value = courseFilterStoreTeachersToComponentTeachers(result);
    }

    if (callback) {
      callback();
    }
  } else if (name === 'skills') {
    if (skills.value.length <= 11) {
      const result = await apiReadSkills(config.public.apiUrl);
      skills.value = courseFilterStoreSkillsToComponentSkills(result);
    }

    if (callback) {
      callback();
    }
  } else if (name === 'tools') {
    if (tools.value.length <= 11) {
      const result = await apiReadTools(config.public.apiUrl);
      tools.value = courseFilterStoreToolsToComponentTools(result);
    }

    if (callback) {
      callback();
    }
  }
};

try {
  const result = await apiReadCourses(config.public.apiUrl, offset.value, size.value);
  setCoursesAndFilters(result);
} catch (error: any) {
  console.log(error.message);
}

//

const onFilter = async (): Promise<void> => {
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

  await load(offset.value, size.value, null, filters, false, false);
};

watch(selectedDirection, () => {
  onFilter();
});

watch(selectedRating, () => {
  onFilter();
}, {
  deep: true,
});

watch(selectedSchools, () => {
  onFilter();
}, {
  deep: true,
});

watch(selectedCategories, () => {
  onFilter();
}, {
  deep: true,
});

watch(selectedProfessions, () => {
  onFilter();
}, {
  deep: true,
});

watch(selectedTeachers, () => {
  onFilter();
}, {
  deep: true,
});

watch(selectedSkills, () => {
  onFilter();
}, {
  deep: true,
});

watch(selectedTools, () => {
  onFilter();
}, {
  deep: true,
});

watch(selectedFormat, () => {
  onFilter();
});

watch(selectedLevels, () => {
  onFilter();
}, {
  deep: true,
});

const onChangePrices = (price: Number | Array<Number>): void => {
  window.setTimeout(() => {
    onFilter();
  }, 200);
};

const onChangeDurations = (price: Number | Array<Number>): void => {
  window.setTimeout(() => {
    onFilter();
  }, 200);
};

watch(selectedCredit, () => {
  onFilter();
});

watch(selectedFree, () => {
  onFilter();
});
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/catalog.scss";
</style>
