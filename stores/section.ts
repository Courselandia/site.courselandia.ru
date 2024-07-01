import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import type { IResponseItem } from '@/interfaces/response';
import type ISectionLink from '@/interfaces/stores/course/sectionLink';
import type TLink from '@/types/link';

export default defineStore('section', {
  state: () => ({
    itemLinkSection: null as ISectionLink | null,
  }),
  actions: {
    async linkSection(
      sectionType1: string,
      sectionLink1: string,
      sectionType2: string | null = null,
      sectionLink2: string | null = null,
      level: TLink | null = null,
      free: boolean = false,
    ): Promise<IResponseItem<ISectionLink>> {
      try {
        const config = useRuntimeConfig();

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

        this.itemLinkSection = response.data.data;

        return response.data;
      } catch (error) {
        this.itemLinkSection = null;

        throw error;
      }
    },
  },
});
