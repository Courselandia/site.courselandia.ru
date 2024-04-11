import axios from '@/helpers/axios';
import type { IResponseItem } from '@/interfaces/response';
import type ICollection from '@/interfaces/stores/collection/collection';

export default defineEventHandler(async (event): Promise<ICollection | null> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const link = urlParams.get('link');
  const cachedCollection = await useStorage().getItem(`redis:collection.link.${link}`);

  if (cachedCollection) {
    return cachedCollection as ICollection;
  }

  const path = config.public.development ? `/api/private/site/collection/link/${link}` : `/storage/json/collections/link/${link}.json`;

  const response = await axios.get<IResponseItem<ICollection>>(path, {
    baseURL: config.public.apiUrl,
  });

  await useStorage().setItem(`redis:collection.link.${link}`, response.data.data);

  return response.data.data;
});
