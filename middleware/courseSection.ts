export default defineNuxtRouteMiddleware((to): boolean => {
  const title = 'Каталог онлайн курсов от Courselandia';
  const description = 'Каталог курсов от ведущих онлайн школ по разным направлениям. Удобный поиск по профессиям, направлениям, инструментам и навыкам. Найди свой курс быстро и легко.';

  useHead({
    title,
    meta: [
      {
        name: 'description',
        content: description,
      },
      {
        property: 'og:title',
        content: title,
      },
      {
        property: 'og:description',
        content: description,
      },
    ],
  });

  return true;
});
