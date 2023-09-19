// eslint-disable-next-line no-undef
import axios from 'axios';

import IApiReadCourses from '@/interfaces/api/course/apiReadCourses';
import { IResponseData, IResponseItems } from '@/interfaces/response';
import ICategory from '@/interfaces/stores/course/category';
import ICourse from '@/interfaces/stores/course/course';
import IDirection from '@/interfaces/stores/course/direction';
import IFilterSkill from '@/interfaces/stores/course/filterSkill';
import IFilterTeacher from '@/interfaces/stores/course/filterTeacher';
import IFilterTool from '@/interfaces/stores/course/filterTool';
import IProfession from '@/interfaces/stores/course/profession';
import ISchool from '@/interfaces/stores/school/school';

export default defineNuxtConfig({
  ssr: true,
  dev: process.env.NODE_ENV !== 'production',
  css: [
    '~/assets/scss/app.scss',
  ],
  components: false,
  plugins: [
    '@/plugins/outsideClick.ts',
    '@/plugins/floating.ts',
    '@/plugins/dayjs.ts',
    '@/plugins/google.ts',
  ],
  modules: [
    '@pinia/nuxt',
    'nuxt-jsonld',
    [
      'yandex-metrika-module-nuxt3',
      {
        id: process.env.YANDEX_METRIKA_ID,
        webvisor: true,
        consoleLog: false,
        clickmap: true,
        // useCDN: false,
        trackLinks: true,
        accurateTrackBounce: true,
      },
    ],
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL,
      siteUrl: process.env.NUXT_SITE_URL,
      // development: process.env.NODE_ENV === 'development',
      development: false,
      googleMeasurementId: process.env.GOOGLE_MEASUREMENT_ID,
      yandexMeasurementId: process.env.YANDEX_METRIKA_ID,
    },
  },
  router: {
    options: {
      linkActiveClass: 'link--active',
      linkExactActiveClass: 'link--exact-active',
      strict: true,
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      title: 'Агрегатор онлайн-курсов Courselandia',
      meta: [
        {
          charset: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'theme-color',
          content: '#121F42',
        },
        {
          property: 'og:title',
          content: 'Агрегатор онлайн-курсов Courselandia',
        },
        {
          property: 'og:type',
          content: 'article',
        },
        {
          property: 'og:url',
          content: 'https://courselandia.ru',
        },
        {
          property: 'og:image',
          content: 'https://api.courselandia.ru/storage/uploaded/images/prev.png',
        },
        {
          property: 'og:image:width',
          content: '1200',
        },
        {
          property: 'og:image:height',
          content: '630',
        },
        {
          property: 'og:description',
          content: 'Courselandia — это огромный каталог онлайн курсов по разным направлениям с умным поиском по навыкам, направлениям, профессиям и инструментам. Найдите свой курс быстро и легко.',
        },
        {
          name: 'yandex-verification',
          content: '71440411ee92b8f8',
        },
        {
          name: 'description',
          content: 'Courselandia — это огромный каталог онлайн курсов по разным направлениям с умным поиском по навыкам, направлениям, профессиям и инструментам. Найдите свой курс быстро и легко.',
        },
      ],
      link: [
        {
          rel: 'shortcut icon',
          href: 'https://courselandia.ru/images/favicon.ico',
          type: 'image/x-icon',
        },
        {
          rel: 'icon',
          href: 'https://courselandia.ru/images/favicon.svg',
          type: 'image/svg+xml',
        },
        {
          rel: 'icon',
          href: 'https://courselandia.ru/images/favicon.png',
          type: 'image/png',
        },
      ],
    },
  },
  webpack: {
    extractCSS: true,
  },
  experimental: {
    inlineSSRStyles: false,
  },
  hooks: {
    'nitro:config': async function (nitroConfig) {
      let routers: string[] = [];

      // Courses
      const responseCourses = await axios.get<IResponseData<IApiReadCourses>>('/api/private/site/course/read', {
        baseURL: process.env.NUXT_API_URL,
      });

      const { courses } = responseCourses.data.data;

      routers = courses
        .map((item: ICourse) => `/courses/show/${item.school?.link}/${item.link}`);

      nitroConfig.prerender?.routes?.push(...routers);

      // Skills
      const responseSkills = await axios.get<IResponseItems<IFilterSkill>>('/api/private/site/course/skills', {
        baseURL: process.env.NUXT_API_URL,
      });

      const skills: IFilterSkill[] = responseSkills.data.data;

      routers = skills
        .map((item: IFilterSkill) => `/courses/skill/${item.link}`);

      nitroConfig.prerender?.routes?.push(...routers);

      // Teachers
      const responseTeachers = await axios.get<IResponseItems<IFilterTeacher>>('/api/private/site/course/teachers', {
        baseURL: process.env.NUXT_API_URL,
      });

      const teachers: IFilterTeacher[] = responseTeachers.data.data;

      routers = teachers
        .map((item: IFilterTeacher) => `/courses/teacher/${item.link}`);

      nitroConfig.prerender?.routes?.push(...routers);

      // Tools
      const responseTools = await axios.get<IResponseItems<IFilterTool>>('/api/private/site/course/tools', {
        baseURL: process.env.NUXT_API_URL,
      });

      const tools: IFilterTool[] = responseTools.data.data;

      routers = tools
        .map((item: IFilterTool) => `/courses/tool/${item.link}`);

      nitroConfig.prerender?.routes?.push(...routers);

      // Professions
      const responseProfessions = await axios.get<IResponseItems<IProfession>>('/api/private/site/course/professions', {
        baseURL: process.env.NUXT_API_URL,
      });

      const professions: IProfession[] = responseProfessions.data.data;

      routers = professions
        .map((item: IProfession) => `/courses/profession/${item.link}`);

      nitroConfig.prerender?.routes?.push(...routers);

      // Categories
      const responseCategories = await axios.get<IResponseItems<ICategory>>('/api/private/site/course/categories', {
        baseURL: process.env.NUXT_API_URL,
      });

      const categories: ICategory[] = responseCategories.data.data;

      routers = categories
        .map((item: ICategory) => `/courses/category/${item.link}`);

      nitroConfig.prerender?.routes?.push(...routers);

      // Reviews
      const responseSchools = await axios.get<IResponseItems<ISchool>>('/api/private/site/school/read', {
        baseURL: process.env.NUXT_API_URL,
      });

      const schools: ISchool[] = responseSchools.data.data;
      routers = schools
        .filter((item: ISchool) => item.reviews_count)
        .map((item: ISchool) => `/reviews/${item.link}`);

      nitroConfig.prerender?.routes?.push(...routers);

      // Schools
      routers = schools
        .map((item: ISchool) => `/courses/school/${item.link}`);

      nitroConfig.prerender?.routes?.push(...routers);

      // Directions
      const responseDirections = await axios.get<IResponseItems<IDirection>>('/api/private/site/course/directions', {
        baseURL: process.env.NUXT_API_URL,
      });

      const directions: IDirection[] = responseDirections.data.data;

      routers = directions
        .map((item: IDirection) => `/courses/direction/${item.link}`);

      nitroConfig.prerender?.routes?.push(...routers);
    },
    'vite:extend': function ({ nuxt, config }) {
      return config.build.assetsInlineLimit = 0;
    },
  },
  nitro: {
    prerender: {
      concurrency: 20,
      crawlLinks: false,
    },
  },
});
