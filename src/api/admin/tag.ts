import { defHttp } from '/@/utils/http/axios';
import { BasicPageParams, tableModel, RenameParams, BasicResult } from '/@/api/model/baseModel';

enum Api {
  SEARCH_TAG = '/idoc/common/tags',
  SAVE_TAG = '/api/tags/workspace/SpacesStore',
  DELETE_TAG = '/api/tags/workspace/SpacesStore',
}

export function getTagByPage(params: BasicPageParams) {
  return defHttp.post<tableModel>({
    url: Api.SEARCH_TAG,
    params,
  });
}

export function saveTag(key: string, params: RenameParams) {
  return defHttp.put<BasicResult>({
    url: `${Api.SAVE_TAG}/${key}`,
    params,
  });
}

export function deleteTag(key: string) {
  return defHttp.delete<BasicResult>({
    url: `${Api.SAVE_TAG}/${key}`,
  });
}
