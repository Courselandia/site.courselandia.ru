import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/var/www/courselandia.ru/data/www/site.courselandia.ru/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}