import { defHttp } from '/@/utils/http/axios';
import {
  GetKeyParams,
  KeyResult,
  SaveNodeParams,
  DownloadParams,
  UploadResult,
} from '/@/api/model/baseModel';
import { downloadByUrl } from '/@/utils/file/download';
import { getToken } from '/@/utils/auth';
import { UploadFileParams } from '/#/axios';

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
  return defHttp.get<KeyResult>({
    url: Api.GET_KEY_WITHPATH,
    params,
  });
}

export async function saveNode(params: SaveNodeParams) {
  return defHttp.post<KeyResult>({
    url: Api.SAVE_NODE,
    params,
  });
}

export function download(params: DownloadParams) {
  const ticket = getToken();
  downloadByUrl({
    url: `/slingshot/node/content/workspace/SpacesStore/${params.key}/${encodeURIComponent(
      params.name,
    )}?a=true&alf_ticket=${ticket}`,
    target: '_self',
  });
}

export async function deleteNode(key: String) {
  return defHttp.delete<any>({
    url: `/slingshot/doclib/action/file/node/workspace/SpacesStore/${key}`,
  });
}

export function upload(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  const destination = params.data ? params.data.destination : '';
  return defHttp.uploadFile<UploadResult>(
    {
      url: `/idoc/common/node/upload/workspace://SpacesStore/${destination}`,
      onUploadProgress,
    },
    params,
  );
}
