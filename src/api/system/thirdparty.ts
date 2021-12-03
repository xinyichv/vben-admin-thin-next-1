import { ContentTypeEnum } from '/@/enums/httpEnum';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  SYS_SETTING = '/idoc/common/system/syssetting',
  BASE_CONFIG = '/idoc/pages/sysconfig/baseconfig',
}

export function getSysSetting(params: any) {
  return defHttp.post<any>({
    url: Api.SYS_SETTING,
    params,
  });
}

export function setSysSetting(params: any) {
  return defHttp.post<any>({
    url: Api.BASE_CONFIG,
    params,
    headers: {
      'Content-type': ContentTypeEnum.FORM_DATA,
    },
  });
}
