import { apiLinkCollection } from '@/api/collection';

export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const {
    link,
  } = to.params;

  try {
    const result = await apiLinkCollection(link as string);

    const config = useRuntimeConfig();
    const title = result?.metatag?.title;
    const description = result?.metatag?.description;
    const image = result?.image_big_id?.path;
    const width = result?.image_big_id?.width;
    const height = result?.image_big_id?.height;

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
        {
          property: 'og:image',
          content: image || `${config.public.apiUrl}/storage/uploaded/images/prev.png`,
        },
        {
          property: 'og:image:width',
          content: width || '1200',
        },
        {
          property: 'og:image:height',
          content: height || '630',
        },
      ],
    });

    return !!result;
  } catch (error: any) {
    return false;
  }
});
