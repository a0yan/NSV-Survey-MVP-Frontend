export interface GeneralMetaResponse<T> {
  status: string;
  msg: string;
  data: T;
}