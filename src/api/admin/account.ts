import { defHttp } from '/@/utils/http/axios';
import { tableModel } from '/@/api/model/baseModel';
import {
  GetGroupsParams,
  GetGroupsResult,
  GetUsersParams,
  GetAuthoritiesParams,
  CreateUserParams,
  UpdateUserParams,
  ChangePasswordParams,
  GetUserInfoParams,
  GetUserInfoResult,
  ImportResult,
  UpdateGroupParams,
} from './model/account';
import { TreeItem } from '/@/components/Tree';
import { GroupsSortByEnum } from '/@/enums/accountEnum';

enum Api {
  GET_ROOTGROUPS = '/api/rootgroups',
  GET_CHILDGROUPS = '/api/groups',
  GET_USERS = '/idoc/common/user/searchuser',
  GET_AUTHORITIES = '/idoc/common/user/searchauthorities',
  SAVE_USER = '/api/people',
  CHANGE_PASSWORD = '/api/person/changepassword',
  GET_USERINFO = '/api/people',
  DELETE_USER = '/api/people',
  IMPORT_WECHAT = '/idoc/wechat/user/syncuser',
  SAVE_ROOTGROUP = '/api/rootgroups',
  SAVE_GROUP = '/api/groups',
  DELETE_GROUP = '/api/groups',
}

export async function getRootGroups(params: GetGroupsParams | null) {
  const res: GetGroupsResult = await defHttp.get<GetGroupsResult>({
    url: Api.GET_ROOTGROUPS,
    params: {
      zone: 'APP.DEFAULT',
      skipCount: 0,
      maxItems: 200,
      sortBy: GroupsSortByEnum.AUTHORITYNAME,
      ...params,
    },
  });
  const rtnData: TreeItem[] = [];
  if (res.data.length > 0) {
    for (let i = 0; i < res.data.length; i++) {
      const dataObj = res.data[i];
      rtnData.push({
        key: dataObj.fullName,
        title: dataObj.displayName,
      });
    }
  }
  return rtnData;
}

export function getChildGroups(shortGroupId: string, params: GetGroupsParams) {
  if (shortGroupId.startsWith('GROUP_')) {
    shortGroupId = shortGroupId.substring(6);
  }
  return defHttp.get<GetGroupsResult>({
    url: `${Api.GET_CHILDGROUPS}/${shortGroupId}/children`,
    params: {
      ...params,
      authorityType: 'GROUP',
    },
  });
}

export function getUserByPage(params: GetUsersParams) {
  return defHttp.post<tableModel>({
    url: Api.GET_USERS,
    params,
  });
}

export function getAuthorities(params: GetAuthoritiesParams) {
  return defHttp.post<any>({
    url: Api.GET_AUTHORITIES,
    params,
  });
}

export function createUser(params: CreateUserParams) {
  return defHttp.post<any>({
    url: Api.SAVE_USER,
    params: {
      lastName: '',
      ...params,
    },
  });
}

export function getUserInfo(userId: string, params: GetUserInfoParams) {
  return defHttp.get<GetUserInfoResult>({
    url: `${Api.GET_USERINFO}/${userId}`,
    params,
  });
}

export function updateUser(key: string, params: UpdateUserParams) {
  return defHttp.put<any>({
    url: `${Api.SAVE_USER}/${key}`,
    params,
  });
}

export function changePassword(key: string, params: ChangePasswordParams) {
  return defHttp.post<any>({
    url: `${Api.CHANGE_PASSWORD}/${key}`,
    params,
  });
}

export function deleteUser(key: string) {
  return defHttp.delete<any>({
    url: `${Api.DELETE_USER}/${key}`,
  });
}

export function importWechat() {
  return defHttp.get<ImportResult>({
    url: Api.IMPORT_WECHAT,
    timeout: 120000,
  });
}

export function createRootGroup(shortGroupId: string, params: UpdateGroupParams) {
  if (shortGroupId.startsWith('GROUP_')) {
    shortGroupId = shortGroupId.substring(6);
  }
  return defHttp.post<any>({
    url: `${Api.SAVE_ROOTGROUP}/${shortGroupId}`,
    params,
  });
}

export function createOrAddChildGroup(shortParentGroupId: string, groupId: string) {
  if (shortParentGroupId.startsWith('GROUP_')) {
    shortParentGroupId = shortParentGroupId.substring(6);
  }
  if (!groupId.startsWith('GROUP_')) {
    groupId = 'GROUP_' + groupId;
  }
  return defHttp.post<any>(
    {
      url: `${Api.SAVE_GROUP}/${shortParentGroupId}/children/${groupId}`,
    },
    {
      errorMessageMode: 'none',
    },
  );
}

export function updateGroup(shortGroupId: string, params: UpdateGroupParams) {
  if (shortGroupId.startsWith('GROUP_')) {
    shortGroupId = shortGroupId.substring(6);
  }
  return defHttp.put<any>({
    url: `${Api.SAVE_GROUP}/${shortGroupId}`,
    params,
  });
}

export function removeGroup(shortParentGroupId: string, groupId: string) {
  if (shortParentGroupId.startsWith('GROUP_')) {
    shortParentGroupId = shortParentGroupId.substring(6);
  }
  if (!groupId.startsWith('GROUP_')) {
    groupId = 'GROUP_' + groupId;
  }
  return defHttp.delete<any>({
    url: `${Api.DELETE_GROUP}/${shortParentGroupId}/children/${groupId}`,
  });
}

export function deleteGroup(shortGroupId: string) {
  if (shortGroupId.startsWith('GROUP_')) {
    shortGroupId = shortGroupId.substring(6);
  }
  return defHttp.delete<any>({
    url: `${Api.DELETE_GROUP}/${shortGroupId}`,
  });
}
