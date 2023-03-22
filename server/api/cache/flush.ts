export default defineEventHandler(async (): Promise<boolean> => {
  await useStorage().clear();

  return true;
});
