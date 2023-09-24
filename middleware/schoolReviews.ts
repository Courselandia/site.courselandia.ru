export default defineNuxtRouteMiddleware(async (to): Promise<boolean | void> => {
  const config = useRuntimeConfig();

  const {
    link,
  } = to.params;

  try {
    const result = await $fetch('/api/school/link', {
      params: {
        link: link as string,
      },
    });

    if (!result?.reviews_count) {
      return false;
    }

    return !!result;
  } catch (error: any) {
    return false;
  }
});
