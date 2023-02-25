import { IResponseItems } from '@/interfaces/response';
import IFaq from '@/interfaces/stores/faq/faq';
import faq from '@/stores/faq';

export const apiReadFaqs = async (apiUrl: string, school: string): Promise<Array<IFaq>> => {
  const {
    readFaqs,
  } = faq();

  const loadFaqs = async ():
    Promise<IResponseItems<IFaq>> => readFaqs(apiUrl, school);

  const resultFaqs = await useAsyncData('faqs', async () => loadFaqs());

  return resultFaqs.data.value?.data;
};
