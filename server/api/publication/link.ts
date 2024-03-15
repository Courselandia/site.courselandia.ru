import axios from '@/helpers/axios';
import type { IResponseItem } from '@/interfaces/response';
import type IPublication from '@/interfaces/stores/publication/publication';

export default defineEventHandler(async (event): Promise<IPublication | null> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const link = urlParams.get('link');
  const cachedPublication = await useStorage().getItem(`redis:publication.link.${link}`);

  if (cachedPublication) {
    return cachedPublication as IPublication;
  }

  const path = config.public.development ? `/api/private/site/publication/link/${link}` : `/storage/json/publications/${link}.json`;

  const response = await axios.get<IResponseItem<IPublication>>(path, {
    baseURL: config.public.apiUrl,
  });

  await useStorage().setItem(`redis:publication.link.${link}`, response.data.data);

  return response.data.data;
});
