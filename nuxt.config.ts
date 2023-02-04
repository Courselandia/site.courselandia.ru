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
  ],
  modules: [
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL,
    },
  },
  router: {
    options: {
      linkActiveClass: 'link--active',
      linkExactActiveClass: 'link--exact-active',
    },
  },
  app: {
    head: {
      title: 'Courselandia.ru',
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
