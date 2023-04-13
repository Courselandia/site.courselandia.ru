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
    '@/plugins/floating.ts',
    '@/plugins/dayjs.ts',
    '@/plugins/google.ts',
  ],
  modules: [
    '@pinia/nuxt',
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
      development: process.env.NODE_ENV === 'development',
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
      description: 'Courselandia - это огромный каталог онлайн курсов по разным направлениям с умным поиском по навыкам, направлениям, профессиям и инструментами.',
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
          content: 'https://api.courselandia.ru/storage/uploaded/images/prev.webp',
        },
        {
          property: 'og:image:width',
          content: '620',
        },
        {
          property: 'og:image:height',
          content: '620',
        },
        {
          property: 'og:description',
          content: 'Courselandia - это огромный каталог онлайн курсов по разным направлениям с умным поиском по навыкам, направлениям, профессиям и инструментами.',
        },
        {
          name: 'yandex-verification',
          content: '71440411ee92b8f8',
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
  nitro: {
    storage: {
      redis: {
        driver: 'redis',
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    },
  },
});
