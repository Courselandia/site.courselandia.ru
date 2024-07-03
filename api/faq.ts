import ECacheDate from '@/enums/cache';
import type { IResponseItems } from '@/interfaces/response';
import type IFaq from '@/interfaces/stores/faq/faq';
import faq from '@/stores/faq';

export const apiReadFaqs = async (
  school: string,
  cacheDate: ECacheDate = ECacheDate.DAY,
): Promise<Array<IFaq>> => {
  const {
    readFaqs,
  } = faq();

  const loadFaqs = async ():
    Promise<IResponseItems<IFaq>> => readFaqs(school, cacheDate);

  const resultFaqs = await useAsyncData('faqs', async () => loadFaqs());

  return resultFaqs.data.value?.data || [];
};
