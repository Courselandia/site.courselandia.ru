import { AxiosResponse } from 'axios';

export interface IResponseItem<T> extends AxiosResponse {
  success: boolean
  data: T | null,
}

export interface IResponseData<T> extends AxiosResponse {
  success: boolean
  data: T,
}

export interface IResponseItems<T> extends AxiosResponse {
  success: boolean
  data: T[],
  total: number,
}
