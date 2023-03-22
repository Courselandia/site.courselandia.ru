import favorite from '@/stores/favorite';

export default defineNuxtRouteMiddleware((): void => {
  const { initFavorite } = favorite();
  initFavorite();
});
