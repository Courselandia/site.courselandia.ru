import axios from '@/helpers/axios';
import type { IResponseItem } from '@/interfaces/response';
import type ISectionLink from '@/interfaces/stores/course/sectionLink';

export default defineEventHandler(async (event): Promise<ISectionLink | null> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const sectionType1 = urlParams.get('sectionType1');
  const sectionLink1 = urlParams.get('sectionLink1');
  const sectionType2 = urlParams.get('sectionType2');
  const sectionLink2 = urlParams.get('sectionLink2');
  const level = urlParams.get('level');
  const free = urlParams.get('free') === '1' ? 1 : 0;
  const cacheDate = urlParams.get('cacheDate');
  const key = `redis:section.link.${sectionType1}.${sectionLink1}.${sectionType2}.${sectionLink2}.${level}.${free}.${cacheDate}`;
  const cachedSection = await useStorage().getItem(key);

  if (cachedSection) {
    return cachedSection as ISectionLink;
  }

  let pathToJson = `/storage/json/sections/${sectionType1}_${sectionLink1}`;

  if (sectionType2 && sectionLink2) {
    pathToJson += `_${sectionType2}_${sectionLink2}`;
  }

  if (level) {
    pathToJson += `_${level}`;
  }

  if (free) {
    pathToJson += '_free';
  }

  pathToJson += '.json';
  const items = [
    {
      type: sectionType1,
      link: sectionLink1,
    },
  ];

  if (sectionType2 && sectionLink2) {
    items[1] = {
      type: sectionType2,
      link: sectionLink2,
    };
  }

  const path = config.public.development ? '/api/private/site/section/link' : pathToJson;
  const response = await axios.get<IResponseItem<ISectionLink>>(path, {
    baseURL: config.public.apiUrl,
    params: config.public.development ? {
      level,
      free,
      items,
    } : undefined,
  });

  await useStorage().setItem(key, response.data.data);

  return response.data.data;
});
