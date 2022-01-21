import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const isodoc: AppRouteModule = {
  path: '/isodoc',
  name: 'ISODoc',
  component: LAYOUT,
  redirect: '/isodoc/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'grommet-icons:send',
    title: t('routes.isodoc.document'),
    orderNo: 200,
  },
  children: [
    {
      path: 'index',
      name: 'ISODocPage',
      component: () => import('/@/views/isodoc/document/index.vue'),
      meta: {
        title: t('routes.isodoc.document'),
        icon: 'grommet-icons:send',
        hideMenu: true,
      },
    },
  ],
};

export default isodoc;
