import { h } from 'vue';
import { Input } from 'ant-design-vue';
import { FormSchema } from '/@/components/Form/index';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

// tab的list
export const settingList = [
  {
    key: '1',
    name: t('thirdparty.wechat'),
    component: 'Wechat',
  },
  {
    key: '2',
    name: t('thirdparty.dingding'),
    component: 'Dingding',
  },
];

// 微信设置 form
export const wechatSetschemas: FormSchema[] = [
  {
    field: 'compinfo',
    component: 'Divider',
    label: t('thirdparty.compinfo'),
  },
  {
    field: 'idoc_wechat_corpid',
    component: 'Input',
    label: t('thirdparty.corpid'),
    colProps: { span: 18 },
    itemProps: {
      name: 'idoc_wechat_corpid',
    },
  },
  {
    field: 'addressbook',
    component: 'Divider',
    label: t('thirdparty.addressbook'),
  },
  {
    field: 'idoc_wechat_contact_secret',
    component: 'Input',
    label: t('thirdparty.corpsecret'),
    colProps: { span: 18 },
    itemProps: {
      name: 'idoc_wechat_contact_secret',
    },
  },
  {
    field: 'idoc',
    component: 'Divider',
    label: t('thirdparty.idoc'),
  },
  {
    field: 'idoc_wechat_app_agentid',
    component: 'Input',
    label: 'AgentId',
    colProps: { span: 18 },
    itemProps: {
      name: 'idoc_wechat_app_agentid',
    },
  },
  {
    field: 'idoc_wechat_app_secret',
    component: 'Input',
    label: t('thirdparty.corpsecret'),
    colProps: { span: 18 },
    itemProps: {
      name: 'idoc_wechat_app_secret',
    },
  },
  {
    field: 'mhomepage',
    component: 'Divider',
    label: t('thirdparty.mhomepage'),
  },
  {
    field: 'mhomepage_home',
    component: 'Input',
    label: t('thirdparty.mhomepagehome'),
    colProps: { span: 18 },
    helpMessage: t('thirdparty.mhomepagehomehelp'),
    render: ({ model }) => {
      const baseUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize';
      const appid = model['idoc_wechat_corpid'];
      const redirect_uri = encodeURIComponent(
        window.location.protocol + '//' + window.location.host + '/#/whome',
      );
      const url =
        baseUrl +
        '?appid=' +
        appid +
        '&redirect_uri=' +
        redirect_uri +
        '&response_type=code&scope=snsapi_base#wechat_redirect';
      return h(Input, {
        value: url,
        readonly: true,
      });
    },
  },
];

// 钉钉设置 form
export const dingdingSetschemas: FormSchema[] = [
  {
    field: 'appsecret',
    component: 'Divider',
    label: t('thirdparty.appsecret'),
  },
  {
    field: 'idoc_dingding_agentid',
    component: 'Input',
    label: 'AgentId',
    colProps: { span: 18 },
    itemProps: {
      name: 'idoc_dingding_agentid',
    },
  },
  {
    field: 'idoc_dingding_appkey',
    component: 'Input',
    label: 'AppKey',
    colProps: { span: 18 },
    itemProps: {
      name: 'idoc_dingding_appkey',
    },
  },
  {
    field: 'idoc_dingding_appsecret',
    component: 'Input',
    label: 'AppSecret',
    colProps: { span: 18 },
    itemProps: {
      name: 'idoc_dingding_appsecret',
    },
  },
];
