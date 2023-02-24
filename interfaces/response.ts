import { AxiosResponse } from 'axios';

export interface IResponseItem<T> extends AxiosResponse {
  success: boolean
  data: T | null,
}

export interface IResponseItems<T> extends AxiosResponse {
  success: boolean
  items: T[],
  total: number,
}
