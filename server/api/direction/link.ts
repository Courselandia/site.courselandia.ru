import axios from '@/helpers/axios';
import { IResponseItem } from '@/interfaces/response';
import IDirectionLink from '@/interfaces/stores/course/directionLink';

export default defineEventHandler(async (event): Promise<IDirectionLink | null> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const link = urlParams.get('link');
  const cachedDirections = await useStorage().getItem(`redis:direction.link.${link}`);

  if (cachedDirections) {
    return cachedDirections as IDirectionLink;
  }

  const response = await axios.get<IResponseItem<IDirectionLink>>(`/api/private/site/direction/link/${link}`, {
    baseURL: config.public.apiUrl,
  });

  await useStorage().setItem(`redis:direction.link.${link}`, response.data.data);

  return response.data.data;
});
