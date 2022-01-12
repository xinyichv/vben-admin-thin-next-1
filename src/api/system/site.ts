import { defHttp } from '/@/utils/http/axios';
import {
  BasicPageParams,
  tableModel,
  BasicResResult,
  BasicDelParams,
  BasicBatchResult,
} from '/@/api/model/baseModel';
import { SaveSiteParams } from '/@/api/system/model/siteModel';

enum Api {
  SEARCH_SITE = '/idoc/common/site/searchsite',
  SAVE_SITE = '/idoc/common/site/savesite',
  DELETE_SITE = '/idoc/common/site/deletesite',
}

export function getSiteByPage(params: BasicPageParams) {
  return defHttp.post<tableModel>({
    url: Api.SEARCH_SITE,
    params,
  });
}

export function saveSite(params: SaveSiteParams) {
  return defHttp.post<BasicResResult>({
    url: Api.SAVE_SITE,
    params,
  });
}

export function deleteSite(params: BasicDelParams) {
  return defHttp.post<BasicBatchResult<any>>({
    url: Api.DELETE_SITE,
    params,
  });
}
