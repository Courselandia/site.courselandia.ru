// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  dev: process.env.NODE_ENV !== 'production',
  css: [
    '~/assets/scss/app.scss',
  ],
  plugins: [

  ],
})
