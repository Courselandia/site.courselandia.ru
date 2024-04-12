import axios from '@/helpers/axios';
import type { IResponseItem } from '@/interfaces/response';
import type ICategoryLink from '@/interfaces/stores/course/categoryLink';

export default defineEventHandler(async (event): Promise<ICategoryLink | null> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const link = urlParams.get('link');
  const cacheDate = urlParams.get('cacheDate');
  const cacheIndex = `redis:category.link.${link}.${cacheDate}`;
  const cachedCategories = await useStorage().getItem(cacheIndex);

  if (cachedCategories) {
    return cachedCategories as ICategoryLink;
  }

  const path = config.public.development ? `/api/private/site/category/link/${link}` : `/storage/json/categories/${link}.json`;
  const response = await axios.get<IResponseItem<ICategoryLink>>(path, {
    baseURL: config.public.apiUrl,
  });

  await useStorage().setItem(cacheIndex, response.data.data);

  return response.data.data;
});
