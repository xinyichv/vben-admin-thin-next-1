export interface GetGroupsParams {
  shortNameFilter?: string;
  zone?: string;
  maxItems: number;
  skipCount?: number;
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

export interface GetAuthoritiesParams {
  authorityType?: string;
  maxResults?: number;
  filter?: string;
}

export interface CreateUserParams {
  userName: string;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  groups: string[];
  quota: number;
  disableAccount: boolean;
}

export interface UpdateUserParams {
  firstName: string;
  lastName?: string;
  email: string;
  addGroups: string[];
  removeGroups: string[];
  quota: number;
  disableAccount: boolean;
}

export interface ChangePasswordParams {
  newpw: string;
}

export interface GetUserInfoParams {
  groups?: boolean;
}

export interface Capabilities {
  isAdmin: boolean;
  isGuest: boolean;
  isMutable: boolean;
}

export interface Groups {
  itemName: string;
  displayName: string;
}

export interface GetUserInfoResult {
  capabilities: Capabilities;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  groups?: Groups[];
  enabled: boolean;
  quota: number;
}

export interface ImportResult {
  result: string;
  msg: string;
  add: number;
  delete: number;
}

export interface UpdateGroupParams {
  displayName: string;
}
