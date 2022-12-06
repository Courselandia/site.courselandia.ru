import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default"
declare module "/var/www/courselandia.ru/data/www/site.courselandia.ru/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}