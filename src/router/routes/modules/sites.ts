import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const sites: AppRouteModule = {
  path: '/sites',
  name: 'Sites',
  component: LAYOUT,
  redirect: '/sites/list',
  meta: {
    hideChildrenInMenu: true,
    icon: 'mdi:sitemap',
    title: t('site.siteList'),
    orderNo: 300,
  },
  children: [
    {
      path: 'list',
      name: 'SitesPage',
      component: () => import('/@/views/site/list/index.vue'),
      meta: {
        title: t('site.siteList'),
        icon: 'mdi:sitemap',
        hideMenu: true,
      },
    },
  ],
};

export default sites;
