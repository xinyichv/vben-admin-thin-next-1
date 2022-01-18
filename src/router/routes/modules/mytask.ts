import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const mytask: AppRouteModule = {
  path: '/mytask',
  name: 'Mytask',
  component: LAYOUT,
  redirect: '/mytask/todo',
  meta: {
    icon: 'mdi:alpha-p-circle',
    title: t('routes.mytask.task'),
    orderNo: 400,
  },
  children: [
    {
      path: 'todo',
      name: 'TodoPage',
      component: () => import('/@/views/mytask/todo/index.vue'),
      meta: {
        title: t('routes.mytask.task'),
        // icon: 'mdi:alpha-p-circle',
      },
    },
    {
      path: 'apply',
      name: 'ApplyPage',
      component: () => import('/@/views/mytask/apply/index.vue'),
      meta: {
        title: t('routes.mytask.apply'),
        // icon: 'mdi:application-export',
      },
    },
  ],
};

export default mytask;
