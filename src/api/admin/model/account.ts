export interface GetGroupsParams {
  shortNameFilter?: string;
  zone?: string;
  maxItems: string;
  skipCount?: string;
  sortBy?: string;
}

export interface GroupsData {
  authorityType: string;
  displayName: string;
  fullName: string;
  shortName: string;
  url: string;
  zones: string[];
}

export interface GroupsPaging {
  confidence: string;
  maxItems: number;
  skipCount: number;
  totalItems: number;
  totalItemsRangeEnd: boolean | null;
}

export interface GetGroupsResult {
  data: GroupsData[];
  paging: GroupsPaging;
}

export interface GetUsersAddParams {
  groupId?: string;
  userId?: string;
  userName?: string;
  includeDisabled?: boolean;
}

export interface GetUsersParams {
  page: number;
  pageSize: number;
  field?: string;
  order?: string;
  userId?: string;
  userName?: string;
  groupId?: string;
  includeDisabled?: boolean;
}
