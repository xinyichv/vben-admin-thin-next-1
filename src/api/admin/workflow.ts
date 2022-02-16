import { defHttp } from '/@/utils/http/axios';
import { BasicPageParams, tableModel } from '/@/api/model/baseModel';

enum Api {
  SEARCH_BPM = '/idoc/pages/bpm/getbpm',
}

export function getBpmByPage(params: BasicPageParams & { deployed?: boolean }) {
  return defHttp.post<tableModel>({
    url: Api.SEARCH_BPM,
    params,
  });
}
