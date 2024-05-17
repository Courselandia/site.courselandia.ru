import axios from '@/helpers/axios';
import type { IResponseItem } from '@/interfaces/response';
import type ISchoolPromo from '@/interfaces/stores/promo/school';

export default defineEventHandler(async (event): Promise<ISchoolPromo | null> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const link = urlParams.get('link');
  const cacheDate = urlParams.get('cacheDate');
  const cacheIndex = `redis:promo.link.${link}.${cacheDate}`;
  const cachedPromo = await useStorage().getItem(cacheIndex);

  if (cachedPromo && !config.public.development) {
    return cachedPromo as ISchoolPromo;
  }

  const path = config.public.development ? `/api/private/site/promo/link/${link}` : `/storage/json/promos/link/${link}.json`;

  const response = await axios.get<IResponseItem<ISchoolPromo>>(path, {
    baseURL: config.public.apiUrl,
  });

  if (!config.public.development) {
    await useStorage().setItem(cacheIndex, response.data.data);
  }

  return response.data.data;
});
