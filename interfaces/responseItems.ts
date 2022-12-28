import { AxiosResponse } from 'axios';

export default interface IResponseItems<T> extends AxiosResponse {
  success: boolean
  items: T[],
  total: number,
}
