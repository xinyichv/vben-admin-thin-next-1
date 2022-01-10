import { defHttp } from '/@/utils/http/axios';

enum Api {
  GET_MASTER = '/idoc/pages/database/getmaster',
}

export async function getMaster(params: any) {
  return defHttp.get<any>({
    url: Api.GET_MASTER,
    params,
  });
}
