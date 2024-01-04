import { clone } from 'lodash';
import { defineStore } from 'pinia';

import type TId from '@/types/id';

export default defineStore('favorite', {
  getters: {
    amount: () => {
      const expires = new Date(new Date().setFullYear(new Date().getFullYear() + 30));

      const favorites = useCookie<TId[]>(
        'favorites',
        {
          expires,
          default: () => [],
        },
      );

      return favorites.value.length || 0;
    },
    favorites: () => {
      const expires = new Date(new Date().setFullYear(new Date().getFullYear() + 30));

      const favorites = useCookie<TId[]>(
        'favorites',
        {
          expires,
          default: () => [],
        },
      );

      return favorites.value;
    },
  },
  actions: {
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
        favorites.value = [...favorites.value, id];
      }

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
        const clonedFavorites = clone(favorites.value);
        clonedFavorites.splice(clonedFavorites.indexOf(id), 1);
        favorites.value = clonedFavorites;
      }

      return favorites.value;
    },
    hasFavorite(id: TId): boolean {
      const expires = new Date(new Date().setFullYear(new Date().getFullYear() + 30));

      const favorites = useCookie<TId[]>(
        'favorites',
        {
          expires,
          default: () => [],
        },
      );

      return favorites.value.indexOf(id) !== -1;
    },
  },
});
