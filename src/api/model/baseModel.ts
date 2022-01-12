export interface BasicPageParams {
  page: number;
  pageSize: number;
  key?: string;
}

export interface BasicDelParams {
  keys: string[];
}

export interface BasicBatchResult<T> {
  success: number;
  fail: number;
  data: T[];
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}

export interface BasicResResult {
  result: string;
  data?: any;
  msg?: string;
}

export type tableModel = BasicFetchResult<any>;
