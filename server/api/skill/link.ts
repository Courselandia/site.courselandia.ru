import axios from '@/helpers/axios';
import { IResponseItem } from '@/interfaces/response';
import ISkillLink from '@/interfaces/stores/course/skillLink';

export default defineEventHandler(async (event): Promise<ISkillLink | null> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const link = urlParams.get('link');
  const cachedSkills = await useStorage().getItem(`redis:skill.link.${link}`);

  if (cachedSkills) {
    return cachedSkills as ISkillLink;
  }

  const response = await axios.get<IResponseItem<ISkillLink>>(`/api/private/site/skill/link/${link}`, {
    baseURL: config.public.apiUrl,
  });

  await useStorage().setItem(`redis:skill.link.${link}`, response.data.data);

  return response.data.data;
});
