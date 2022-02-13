export interface BasicResult {
  result: boolean;
  msg?: string;
}

export interface KeyResult {
  key: string;
}

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
  destination?: string;
}

export interface BasicResResult {
  data: any;
}

export interface GetKeyParams {
  path: string;
}

export type tableModel = BasicFetchResult<any>;

export interface SaveNodeParams {
  key?: string;
  destination?: string;
  cm_name?: string;
  type?: string;
  cm_content?: string;
  properties?: any;
}

export interface DownloadParams {
  key: string;
  name: string;
}

export interface UploadResult {
  key: string;
  fileName: string;
}

export interface RenameParams {
  name: string;
}
