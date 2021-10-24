import { defHttp } from '/@/utils/http/axios';
import { GetWechatSettingModel } from './model/thirdpartyModel';

enum Api {
  ACCOUNT_INFO = '/account/getAccountInfo',
}

export const wechatSettingApi = () => defHttp.get<GetWechatSettingModel>({ url: Api.ACCOUNT_INFO });
