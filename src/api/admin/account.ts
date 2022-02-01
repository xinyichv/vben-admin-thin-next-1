import { defHttp } from '/@/utils/http/axios';
import { tableModel } from '/@/api/model/baseModel';
import { GetGroupsParams, GetGroupsResult, GetUsersParams } from './model/account';
import { TreeItem } from '/@/components/Tree';
import { GroupsSortByEnum } from '/@/enums/accountEnum';

enum Api {
  GET_ROOTGROUPS = '/api/groups',
  GET_USERS = '/idoc/common/user/searchuser',
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
  console.log(rtnData);
  return rtnData;
}

export function getUserByPage(params: GetUsersParams) {
  return defHttp.post<tableModel>({
    url: Api.GET_USERS,
    params,
  });
}
