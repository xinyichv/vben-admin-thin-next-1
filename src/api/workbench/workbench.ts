import { defHttp } from '/@/utils/http/axios';
import { getVisitedSitesResultModel } from './model/visitedSites';

enum Api {
  GetVisitedSites = '/getVisitedSites',
}

/**
 * @description: Get user menu based on id
 */

export const getVisitedSites = () => {
  return defHttp.post<getVisitedSitesResultModel>(
    { url: Api.GetVisitedSites },
    { isTransformResponse: true },
  );
};
