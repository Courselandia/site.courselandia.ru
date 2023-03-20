import { createClient } from 'redis';

let client: any = null;

export const createCacheStore = (url: string): void => {
  client = createClient({
    url,
  });
};

export const connectCacheStore = async (): Promise<void> => {
  await client.connect();
};

export const disconnectCacheStore = async (): Promise<void> => {
  await client.disconnect();
};

export const putCacheStore = async (key: string, value: any): Promise<void> => {
  await client.set(key, JSON.stringify(value));
};

export const fetchCacheStore = async (
  key: string,
): Promise<any | null> => {
  const result = await client.get(key);

  if (result) {
    return JSON.parse(result);
  }

  return null;
};

export const hasCacheStore = async (key: string): Promise<boolean> => {
  const result = await fetchCacheStore(key);

  return result !== null;
};

export const rememberCacheStore = async (key: string, getFunction: Function): Promise<any> => {
  if (await hasCacheStore(key)) {
    return await fetchCacheStore(key);
  }

  const value = await getFunction();
  await putCacheStore(key, value);

  return value;
};
