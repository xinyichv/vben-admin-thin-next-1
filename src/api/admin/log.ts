import { defHttp } from '/@/utils/http/axios';
import { assign } from 'lodash-es';
import { tableModel } from '/@/api/model/baseModel';
import { GetLogLoginParams, GetLogLoginResult } from '/@/api/admin/model/logModel';

enum Api {
  GET_LOG_LOGIN = '/api/audit/query/AuditLogin',
  CLEAR_LOG_LOGIN = '/api/audit/clear/AuditLogin',
}

export async function getLoginByPage(params: GetLogLoginParams) {
  params = assign(params, {
    verbose: true,
    forward: false,
    limit: 10000,
  });
  if (params.field && params.field != '') {
    params = assign(params, {
      forward: params.order === 'ascend' ? true : false,
    });
  }
  if (params.user == '') {
    delete params.user;
  }
  if (params.fromTime && params.fromTime != '') {
    params.fromTime = new Date(params.fromTime).getTime().toString();
  }
  if (params.toTime && params.toTime != '') {
    params.toTime = new Date(params.toTime).getTime().toString();
  }
  const res = await defHttp.get<GetLogLoginResult>({
    url: Api.GET_LOG_LOGIN,
    params,
  });
  const loginData: tableModel = {
    total: res.count,
    items: res.entries,
  };
  return loginData;
}

export function clearLogLogin() {
  return defHttp.post<any>({
    url: Api.CLEAR_LOG_LOGIN,
    timeout: 120000,
  });
}
