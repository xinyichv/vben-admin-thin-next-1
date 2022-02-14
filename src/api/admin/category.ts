import { defHttp } from '/@/utils/http/axios';
import { tableModel } from '/@/api/model/baseModel';
import { CategoryTreeParams, CategorySaveParams } from '/@/api/admin/model/category';

enum Api {
  GET_CATEGORY = '/idoc/common/category/categorynode/node/alfresco/category/root',
  GET_CATEGORY_TREE = '/idoc/common/category/categorytree',
  SAVE_CATEGORY = '/idoc/common/category',
  DELETE_CATEGORY = '/api/category/workspace/SpacesStore',
}

export function getCategoryList(key?: string) {
  let url: string = Api.GET_CATEGORY;
  if (key && typeof key == 'string' && key != '') {
    url += '/' + key;
  }
  return defHttp.get<tableModel>({
    url: url,
  });
}

export function getCategoryTree(root?: string) {
  const params: CategoryTreeParams = {};
  if (root && root != '') {
    params.root = root;
  }
  return defHttp.get<any>({
    url: Api.GET_CATEGORY_TREE,
    params,
  });
}

export function createCategory(nodeRef: string, params: CategorySaveParams) {
  nodeRef = nodeRef || '';
  nodeRef = nodeRef.replace('workspace://SpacesStore/', 'workspace/SpacesStore/');
  if (nodeRef != '' && !nodeRef.startsWith('workspace')) {
    nodeRef = 'workspace/SpacesStore/' + nodeRef;
  }
  return defHttp.post<any>({
    url: `${Api.SAVE_CATEGORY}/${nodeRef}`,
    params,
  });
}

export function updateCategory(nodeRef: string, params: CategorySaveParams) {
  nodeRef = nodeRef.replace('workspace://SpacesStore/', 'workspace/SpacesStore/');
  if (!nodeRef.startsWith('workspace')) {
    nodeRef = 'workspace/SpacesStore/' + nodeRef;
  }
  return defHttp.put<any>({
    url: `${Api.SAVE_CATEGORY}/${nodeRef}`,
    params,
  });
}

export function deleteCategory(key: string) {
  return defHttp.delete<any>({
    url: `${Api.DELETE_CATEGORY}/${key}`,
  });
}
