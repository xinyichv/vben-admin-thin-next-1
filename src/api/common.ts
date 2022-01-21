import { defHttp } from '/@/utils/http/axios';
import { GetKeyParams, BasicResult, SaveNodeParams, DownloadParams } from '/@/api/model/baseModel';
import { downloadByUrl } from '/@/utils/file/download';
import { getToken } from '/@/utils/auth';

enum Api {
  GET_MASTER = '/idoc/pages/database/getmaster',
  GET_KEY_WITHPATH = '/idoc/common/system/getkeywithpath',
  SAVE_NODE = '/idoc/common/node/savenode',
}

export async function getMaster(params: any) {
  return defHttp.get<any>({
    url: Api.GET_MASTER,
    params,
  });
}

export async function getKeyWithPath(params: GetKeyParams) {
  return defHttp.get<BasicResult>({
    url: Api.GET_KEY_WITHPATH,
    params,
  });
}

export async function saveNode(params: SaveNodeParams) {
  return defHttp.post<BasicResult>({
    url: Api.SAVE_NODE,
    params,
  });
}

export function download(params: DownloadParams) {
  const ticket = getToken();
  downloadByUrl({
    url: `proxy/alfresco/slingshot/node/content/workspace/SpacesStore/${
      params.key
    }/${encodeURIComponent(params.name)}?a=true&alf_ticket=${ticket}`,
    target: '_self',
  });
}

export async function deleteNode(key: String) {
  return defHttp.delete<any>({
    url: `/slingshot/doclib/action/file/node/workspace/SpacesStore/${key}`,
  });
}
