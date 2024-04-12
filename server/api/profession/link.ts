import axios from '@/helpers/axios';
import type { IResponseItem } from '@/interfaces/response';
import type IProfessionLink from '@/interfaces/stores/course/professionLink';

export default defineEventHandler(async (event): Promise<IProfessionLink | null> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const link = urlParams.get('link');
  const cacheDate = urlParams.get('cacheDate');
  const cacheIndex = `redis:profession.link.${link}.${cacheDate}`;
  const cachedProfessions = await useStorage().getItem(cacheIndex);

  if (cachedProfessions) {
    return cachedProfessions as IProfessionLink;
  }

  const path = config.public.development ? `/api/private/site/profession/link/${link}` : `/storage/json/professions/${link}.json`;
  const response = await axios.get<IResponseItem<IProfessionLink>>(path, {
    baseURL: config.public.apiUrl,
  });

  await useStorage().setItem(cacheIndex, response.data.data);

  return response.data.data;
});
