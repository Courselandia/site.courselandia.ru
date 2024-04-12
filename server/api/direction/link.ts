import axios from '@/helpers/axios';
import type { IResponseItem } from '@/interfaces/response';
import type IDirectionLink from '@/interfaces/stores/course/directionLink';

export default defineEventHandler(async (event): Promise<IDirectionLink | null> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const link = urlParams.get('link');
  const cacheDate = urlParams.get('cacheDate');
  const cacheIndex = `redis:direction.link.${link}.${cacheDate}`;
  const cachedDirections = await useStorage().getItem(cacheIndex);

  if (cachedDirections) {
    return cachedDirections as IDirectionLink;
  }

  const path = config.public.development ? `/api/private/site/direction/link/${link}` : `/storage/json/directions/${link}.json`;
  const response = await axios.get<IResponseItem<IDirectionLink>>(path, {
    baseURL: config.public.apiUrl,
  });

  await useStorage().setItem(cacheIndex, response.data.data);

  return response.data.data;
});
