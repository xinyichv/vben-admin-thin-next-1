import { defHttp } from '/@/utils/http/axios';
import { tableModel } from '/@/api/model/baseModel';

enum Api {
  SEARCH_SITE = '/idoc/common/site/searchsite',
}

export async function getSiteByPage(params: any) {
  return defHttp.post<tableModel>({
    url: Api.SEARCH_SITE,
    params,
  });
}
