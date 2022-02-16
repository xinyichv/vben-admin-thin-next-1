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
  DELETE_NODE = '/slingshot/doclib/action/file/node/workspace/SpacesStore',
  DOWNLOAD_NODE = '/slingshot/node/content/workspace/SpacesStore',
  UPLOAD_NODE = '/idoc/common/node/upload/workspace://SpacesStore',
}

export function getMaster(params: any) {
  return defHttp.get<any>({
    url: Api.GET_MASTER,
    params,
  });
}

export function getKeyWithPath(params: GetKeyParams) {
  return defHttp.get<KeyResult>({
    url: Api.GET_KEY_WITHPATH,
    params,
  });
}

export function saveNode(params: SaveNodeParams) {
  return defHttp.post<KeyResult>({
    url: Api.SAVE_NODE,
    params,
  });
}

export function download(params: DownloadParams) {
  const ticket = getToken();
  let key = params.key;
  if (key.startsWith('workspace')) {
    key = key.replace(/workspace.*/, '');
  }
  downloadByUrl({
    url: `${Api.DOWNLOAD_NODE}/${key}/${encodeURIComponent(
      params.name,
    )}?a=true&alf_ticket=${ticket}`,
    target: '_self',
  });
}

export function deleteNode(key: String) {
  if (key.startsWith('workspace')) {
    key = key.replace(/workspace.*/, '');
  }
  return defHttp.delete<any>({
    url: `${Api.DELETE_NODE}/${key}`,
  });
}

export function upload(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  let destination = params.data ? params.data.destination : '';
  if (destination.startsWith('workspace')) {
    destination = destination.replace(/workspace.*/, '');
  }
  return defHttp.uploadFile<UploadResult>(
    {
      url: `${Api.UPLOAD_NODE}/${destination}`,
      onUploadProgress,
    },
    params,
  );
}
