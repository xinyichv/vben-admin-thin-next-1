import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/setting',
  meta: {
    orderNo: 90,
    icon: 'ant-design:setting-filled',
    title: t('routes.system.system'),
  },
  children: [
    {
      path: 'setting',
      name: 'Setting',
      component: () => import('/@/views/system/setting/index.vue'),
      meta: {
        title: t('routes.system.setting'),
      },
    },
    {
      path: 'thirdparty',
      name: 'ThirdParty',
      component: () => import('/@/views/system/thirdparty/index.vue'),
      meta: {
        title: t('routes.system.thirdparty.thirdparty'),
      },
    },
  ],
};

export default system;
