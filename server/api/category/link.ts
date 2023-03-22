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

  const response = await axios.get<IResponseItem<ICategoryLink>>(`/api/private/site/category/link/${link}`, {
    baseURL: config.public.apiUrl,
  });

  await useStorage().setItem(`redis:category.link.${link}`, response.data.data);

  return response.data.data;
});
