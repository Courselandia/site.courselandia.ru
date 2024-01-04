import { defineStore } from 'pinia';

import type TId from '@/types/id';

export default defineStore('favorite', {
  state: () => ({
    favorites: [] as TId[],
  }),
  getters: {
    amountFavorites: (state) => state.favorites.length || 0,
  },
  actions: {
    initFavorite(): TId[] {
      const expires = new Date(new Date().setFullYear(new Date().getFullYear() + 30));

      const favorites = useCookie<TId[]>(
        'favorites',
        {
          expires,
          default: () => [],
        },
      );

      this.favorites = favorites.value;

      return favorites.value;
    },
    addFavorite(id: TId): TId[] {
      const expires = new Date(new Date().setFullYear(new Date().getFullYear() + 30));

      const favorites = useCookie<TId[]>(
        'favorites',
        {
          expires,
          default: () => [],
        },
      );

      if (!this.hasFavorite(id)) {
        favorites.value[favorites.value.length] = id;
      }

      this.favorites = favorites.value;

      return favorites.value;
    },
    removeFavorite(id: TId): TId[] {
      const expires = new Date(new Date().setFullYear(new Date().getFullYear() + 30));

      const favorites = useCookie<TId[]>(
        'favorites',
        {
          expires,
          default: () => [],
        },
      );

      if (this.hasFavorite(id)) {
        favorites.value.splice(this.favorites.indexOf(id), 1);
      }

      this.favorites = favorites.value;

      return favorites.value;
    },
    hasFavorite(id: TId): boolean {
      return this.favorites.indexOf(id) !== -1;
    },
  },
});
