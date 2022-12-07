// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  ssr: true,
  dev: process.env.NODE_ENV !== 'production',
  css: [
    '~/assets/scss/app.scss',
  ],
  plugins: [],
  modules: [
    '@pinia/nuxt',
  ],
});
