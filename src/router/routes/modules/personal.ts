import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const personal: AppRouteModule = {
  path: '/personal',
  name: 'Personal',
  component: LAYOUT,
  redirect: '/personal/settings',
  meta: {
    icon: 'ic:baseline-person',
    title: t('routes.personal.settings'),
    orderNo: 400,
  },
  children: [
    {
      path: 'settings',
      name: 'SettingsPage',
      component: () => import('/@/views/personal/settings/index.vue'),
      meta: {
        title: t('routes.personal.settings'),
      },
    },
    {
      path: 'favorite',
      name: 'FavoritePage',
      component: () => import('/@/views/personal/favorite/index.vue'),
      meta: {
        title: t('routes.personal.favorite'),
      },
    },
    {
      path: 'share',
      name: 'SharePage',
      component: () => import('/@/views/personal/share/index.vue'),
      meta: {
        title: t('routes.personal.share'),
      },
    },
    {
      path: 'trash',
      name: 'TrashPage',
      component: () => import('/@/views/personal/trash/index.vue'),
      meta: {
        title: t('routes.personal.trash'),
      },
    },
  ],
};

export default personal;
