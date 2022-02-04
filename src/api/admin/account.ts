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
} from './model/account';
import { TreeItem } from '/@/components/Tree';
import { GroupsSortByEnum } from '/@/enums/accountEnum';

enum Api {
  GET_ROOTGROUPS = '/api/groups',
  GET_USERS = '/idoc/common/user/searchuser',
  GET_AUTHORITIES = '/idoc/common/user/searchauthorities',
  SAVE_USER = '/api/people',
  CHANGE_PASSWORD = '/api/person/changepassword',
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
