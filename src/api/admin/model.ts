import { defHttp } from '/@/utils/http/axios';
import { tableModel } from '/@/api/model/baseModel';
import { GetModelContentResult } from './model/modelModel';

enum Api {
  GET_MODEL_LIST = '/idoc/pages/model/getmodel',
  GET_MODEL_CONTENT = '/idoc/common/node/getproperties',
}

export function getModelList() {
  return defHttp.get<tableModel>({
    url: Api.GET_MODEL_LIST,
  });
}

export function getModelContent(key: string) {
  return defHttp.post<GetModelContentResult>({
    url: Api.GET_MODEL_CONTENT,
    params: {
      key,
      properties: ['cm:content', 'cm:modelActive'],
    },
  });
}
