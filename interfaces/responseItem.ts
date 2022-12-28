import { AxiosResponse } from 'axios';

export default interface IResponseItem<T> extends AxiosResponse {
  success: boolean
  data: T,
}
