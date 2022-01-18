import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/setting',
  meta: {
    orderNo: 800,
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
      path: 'account',
      name: 'Account',
      component: () => import('/@/views/system/account/index.vue'),
      meta: {
        title: t('routes.system.account'),
      },
    },
    {
      path: 'organize',
      name: 'Organize',
      component: () => import('/@/views/system/organize/index.vue'),
      meta: {
        title: t('routes.system.organize'),
      },
    },
    {
      path: 'site',
      name: 'Site',
      component: () => import('/@/views/system/site/index.vue'),
      meta: {
        title: t('routes.system.site'),
      },
    },
    {
      path: 'template',
      name: 'Template',
      redirect: '/system/template/file',
      meta: {
        title: t('routes.system.template.template'),
      },
      children: [
        {
          path: 'file',
          name: 'File',
          component: () => import('/@/views/system/template/file/index.vue'),
          meta: {
            title: t('routes.system.template.file'),
          },
        },
        {
          path: 'folder',
          name: 'Folder',
          component: () => import('/@/views/system/template/folder/index.vue'),
          meta: {
            title: t('routes.system.template.folder'),
          },
        },
      ],
    },
    {
      path: 'datadic',
      name: 'Datadic',
      component: () => import('/@/views/system/datadic/index.vue'),
      meta: {
        title: t('routes.system.datadic'),
      },
    },
    {
      path: 'navigate',
      name: 'Navigate',
      component: () => import('/@/views/system/navigate/index.vue'),
      meta: {
        title: t('routes.system.navigate'),
      },
    },
    {
      path: 'category',
      name: 'Category',
      component: () => import('/@/views/system/category/index.vue'),
      meta: {
        title: t('routes.system.category'),
      },
    },
    {
      path: 'tag',
      name: 'Tag',
      component: () => import('/@/views/system/tag/index.vue'),
      meta: {
        title: t('routes.system.tag'),
      },
    },
    {
      path: 'folderrule',
      name: 'Folderrule',
      component: () => import('/@/views/system/folderrule/index.vue'),
      meta: {
        title: t('routes.system.folderrule'),
      },
    },
    {
      path: 'dataModel',
      name: 'DataModel',
      component: () => import('/@/views/system/dataModel/index.vue'),
      meta: {
        title: t('routes.system.dataModel'),
      },
    },
    {
      path: 'workflow',
      name: 'Workflow',
      component: () => import('/@/views/system/workflow/index.vue'),
      meta: {
        title: t('routes.system.workflow'),
      },
    },
    {
      path: 'thirdparty',
      name: 'ThirdParty',
      component: () => import('/@/views/system/thirdparty/index.vue'),
      meta: {
        title: t('routes.thirdparty.thirdparty'),
      },
    },
    {
      path: 'log',
      name: 'Log',
      redirect: '/system/log/system',
      meta: {
        title: t('routes.system.log.system'),
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('/@/views/system/log/login/index.vue'),
          meta: {
            title: t('routes.system.log.login'),
          },
        },
        {
          path: 'operation',
          name: 'Operation',
          component: () => import('/@/views/system/log/operation/index.vue'),
          meta: {
            title: t('routes.system.log.operation'),
          },
        },
      ],
    },
  ],
};

export default system;
