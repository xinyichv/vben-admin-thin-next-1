export interface GetLogLoginParams {
  fromId?: number;
  toId?: number;
  fromTime?: string;
  toTime?: string;
  user?: string;
  forward?: boolean;
  limit?: number;
  verbose?: boolean;
  field?: string;
  order?: string;
}

export interface LoginRowData {
  id: number;
  application: string;
  user: string;
  time: string;
  values: Nullable<any>;
}

export interface GetLogLoginResult {
  count: number;
  entries: LoginRowData[];
}
