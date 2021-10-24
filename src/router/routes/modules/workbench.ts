import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const workbench: AppRouteModule = {
  path: '/workbench',
  name: 'Workbench',
  component: LAYOUT,
  redirect: '/workbench/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:dashboard-filled',
    title: t('routes.home.home'),
    orderNo: 10,
  },
  children: [
    {
      path: 'index',
      name: 'WorkbenchPage',
      component: () => import('/@/views/workbench/index.vue'),
      meta: {
        title: t('routes.home.home'),
        icon: 'ant-design:dashboard-filled',
        hideMenu: true,
      },
    },
  ],
};

export default workbench;
