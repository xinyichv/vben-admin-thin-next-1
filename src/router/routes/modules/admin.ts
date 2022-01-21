import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/admin',
  name: 'Admin',
  component: LAYOUT,
  redirect: '/admin/syssetting',
  meta: {
    orderNo: 90,
    icon: 'ant-design:setting-filled',
    title: t('routes.systemManage'),
  },
  children: [
    {
      path: 'syssetting',
      name: 'SysSetting',
      component: () => import('/@/views/admin/syssetting/index.vue'),
      meta: {
        title: t('routes.setting'),
      },
    },
    {
      path: 'site',
      name: 'Site',
      component: () => import('/@/views/admin/site/index.vue'),
      meta: {
        title: t('routes.site'),
      },
    },
    {
      path: 'datamodel',
      name: 'DataModel',
      component: () => import('/@/views/admin/datamodel/index.vue'),
      meta: {
        title: t('routes.model'),
      },
    },
    {
      path: 'thirdparty',
      name: 'ThirdParty',
      component: () => import('/@/views/admin/thirdparty/index.vue'),
      meta: {
        title: t('routes.thirdparty.thirdparty'),
      },
    },
  ],
};

export default system;
