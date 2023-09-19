import { apiLinkCategory } from '@/api/category';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const {
    link,
  } = to.params;

  const config = useRuntimeConfig();

  try {
    const result = await apiLinkCategory(
      config.public.apiUrl,
      config.public.development,
      link as string,
    );

    const title = result?.metatag?.title || '';
    const description = result?.metatag?.description || '';

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

    return !!result;
  } catch (error: any) {
    return false;
  }
});
