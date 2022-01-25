import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const admin: AppRouteModule = {
  path: '/admin',
  name: 'Admin',
  component: LAYOUT,
  redirect: '/admin/syssetting',
  meta: {
    orderNo: 800,
    icon: 'ant-design:setting-filled',
    title: t('routes.system.system'),
  },
  children: [
    {
      path: 'syssetting',
      name: 'SysSetting',
      component: () => import('/@/views/admin/syssetting/index.vue'),
      meta: {
        title: t('routes.system.setting'),
      },
    },
    {
      path: 'account',
      name: 'Account',
      component: () => import('/@/views/admin/account/index.vue'),
      meta: {
        title: t('routes.system.account'),
      },
    },
    {
      path: 'organize',
      name: 'Organize',
      component: () => import('/@/views/admin/organize/index.vue'),
      meta: {
        title: t('routes.system.organize'),
      },
    },
    {
      path: 'site',
      name: 'Site',
      component: () => import('/@/views/admin/site/index.vue'),
      meta: {
        title: t('routes.system.site'),
      },
    },
    {
      path: 'template',
      name: 'Template',
      redirect: '/admin/template/file',
      meta: {
        title: t('routes.system.template.template'),
      },
      children: [
        {
          path: 'file',
          name: 'File',
          component: () => import('/@/views/admin/template/file/index.vue'),
          meta: {
            title: t('routes.system.template.file'),
          },
        },
        {
          path: 'folder',
          name: 'Folder',
          component: () => import('/@/views/admin/template/folder/index.vue'),
          meta: {
            title: t('routes.system.template.folder'),
          },
        },
      ],
    },
    {
      path: 'datadic',
      name: 'Datadic',
      component: () => import('/@/views/admin/datadic/index.vue'),
      meta: {
        title: t('routes.system.datadic'),
      },
    },
    {
      path: 'navigate',
      name: 'Navigate',
      component: () => import('/@/views/admin/navigate/index.vue'),
      meta: {
        title: t('routes.system.navigate'),
      },
    },
    {
      path: 'category',
      name: 'Category',
      component: () => import('/@/views/admin/category/index.vue'),
      meta: {
        title: t('routes.system.category'),
      },
    },
    {
      path: 'tag',
      name: 'Tag',
      component: () => import('/@/views/admin/tag/index.vue'),
      meta: {
        title: t('routes.system.tag'),
      },
    },
    {
      path: 'folderrule',
      name: 'Folderrule',
      component: () => import('/@/views/admin/folderrule/index.vue'),
      meta: {
        title: t('routes.system.folderrule'),
      },
    },
    {
      path: 'datamodel',
      name: 'DataModel',
      component: () => import('/@/views/admin/datamodel/index.vue'),
      meta: {
        title: t('routes.system.dataModel'),
      },
    },
    {
      path: 'workflow',
      name: 'Workflow',
      component: () => import('/@/views/admin/workflow/index.vue'),
      meta: {
        title: t('routes.system.workflow'),
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
    {
      path: 'log',
      name: 'Log',
      redirect: '/admin/log/login',
      meta: {
        title: t('routes.system.log.system'),
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('/@/views/admin/log/login/index.vue'),
          meta: {
            title: t('routes.system.log.login'),
          },
        },
        {
          path: 'operation',
          name: 'Operation',
          component: () => import('/@/views/admin/log/operation/index.vue'),
          meta: {
            title: t('routes.system.log.operation'),
          },
        },
      ],
    },
  ],
};

export default admin;
