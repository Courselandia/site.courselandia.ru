// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  ssr: true,
  dev: process.env.NODE_ENV !== 'production',
  css: [
    '~/assets/scss/app.scss',
  ],
  components: false,
  plugins: [
    '@/plugins/outsideClick.ts',
    '@/plugins/dayjs.ts',
    '@/plugins/google.ts',
  ],
  modules: [
    '@pinia/nuxt',
    'nuxt-multi-cache',
    'nuxt-jsonld',
    'floating-vue/nuxt',
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
      development: process.env.NODE_ENV === 'development',
      googleMeasurementId: process.env.GOOGLE_MEASUREMENT_ID,
      yandexMeasurementId: process.env.YANDEX_METRIKA_ID,
      redisHost: process.env.REDIS_HOST,
      redisPort: process.env.REDIS_PORT,
    },
    cacheToken: process.env.CACHE_TOKEN,
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
    'vite:extend': ({ nuxt, config }) => {
      return config.build.assetsInlineLimit = 0;
    },
  },
  nitro: {
    storage: {
      redis: {
        driver: 'redis',
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    },
  },
  multiCache: {
    component: {
      enabled: process.env.NODE_ENV !== 'development',
    },
    route: {
      enabled: process.env.NODE_ENV !== 'development',
    },
    api: {
      enabled: process.env.NODE_ENV !== 'development',
      prefix: '/__nuxt_multi_cache',
      authorization: process.env.CACHE_TOKEN || '',
      cacheTagInvalidationDelay: 60000,
    },
  },
});
