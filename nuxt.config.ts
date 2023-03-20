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
    //'@/modules/cache/index.ts',
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
      title: 'Courselandia',
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
      ],
      link: [
        {
          rel: 'icon',
          href: '/images/favicon.ico',
          type: 'image/x-icon',
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
});
