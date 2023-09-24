import axios from '@/helpers/axios';
import { IResponseItem } from '@/interfaces/response';
import ICategoryLink from '@/interfaces/stores/course/categoryLink';

export default defineEventHandler(async (event): Promise<ICategoryLink | null> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const link = urlParams.get('link');
  const cachedCategories = await useStorage().getItem(`redis:category.link.${link}`);

  if (cachedCategories) {
    return cachedCategories as ICategoryLink;
  }

  const path = config.public.development ? `/api/private/site/category/link/${link}` : `/storage/json/categories/${link}.json`;
  const response = await axios.get<IResponseItem<ICategoryLink>>(path, {
    baseURL: config.public.apiUrl,
  });

  await useStorage().setItem(`redis:category.link.${link}`, response.data.data);

  return response.data.data;
});
