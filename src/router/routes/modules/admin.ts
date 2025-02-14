import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const admin: AppRouteModule = {
  path: '/admin',
  name: 'Admin',
  component: LAYOUT,
  redirect: '/admin/setting',
  meta: {
    orderNo: 800,
    icon: 'ant-design:setting-filled',
    title: t('routes.admin.system'),
  },
  children: [
    {
      path: 'setting',
      name: 'Setting',
      component: () => import('/@/views/admin/setting/index.vue'),
      meta: {
        title: t('routes.admin.setting'),
      },
    },
    {
      path: 'account',
      name: 'Account',
      component: () => import('/@/views/admin/account/index.vue'),
      meta: {
        title: t('routes.admin.account'),
      },
    },
    {
      path: 'account_detail/:id',
      name: 'AccountDetail',
      meta: {
        hideMenu: true,
        title: t('routes.admin.accountDetail'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/admin/account',
      },
      component: () => import('/@/views/admin/account/AccountDetail.vue'),
    },
    {
      path: 'site',
      name: 'Site',
      component: () => import('/@/views/admin/site/index.vue'),
      meta: {
        title: t('routes.admin.site'),
      },
    },
    {
      path: 'template',
      name: 'Template',
      redirect: '/admin/template/file',
      meta: {
        title: t('routes.admin.template.template'),
      },
      children: [
        {
          path: 'file',
          name: 'File',
          component: () => import('/@/views/admin/template/file/index.vue'),
          meta: {
            title: t('routes.admin.template.file'),
          },
        },
        {
          path: 'folder',
          name: 'Folder',
          component: () => import('/@/views/admin/template/folder/index.vue'),
          meta: {
            title: t('routes.admin.template.folder'),
          },
        },
      ],
    },
    {
      path: 'datadic',
      name: 'Datadic',
      component: () => import('/@/views/admin/datadic/index.vue'),
      meta: {
        title: t('routes.admin.datadic'),
      },
    },
    {
      path: 'navigate',
      name: 'Navigate',
      component: () => import('/@/views/admin/navigate/index.vue'),
      meta: {
        title: t('routes.admin.navigate'),
      },
    },
    {
      path: 'category',
      name: 'Category',
      component: () => import('/@/views/admin/category/index.vue'),
      meta: {
        title: t('routes.admin.category'),
      },
    },
    {
      path: 'tag',
      name: 'Tag',
      component: () => import('/@/views/admin/tag/index.vue'),
      meta: {
        title: t('routes.admin.tag'),
      },
    },
    {
      path: 'folderrule',
      name: 'Folderrule',
      component: () => import('/@/views/admin/folderrule/index.vue'),
      meta: {
        title: t('routes.admin.folderrule'),
      },
    },
    {
      path: 'datamodel',
      name: 'DataModel',
      component: () => import('/@/views/admin/datamodel/index.vue'),
      meta: {
        title: t('routes.admin.dataModel'),
      },
    },
    {
      path: 'workflow',
      name: 'Workflow',
      component: () => import('/@/views/admin/workflow/index.vue'),
      meta: {
        title: t('routes.admin.workflow'),
      },
    },
    {
      path: 'bpmn/:id',
      name: 'Bpmn',
      meta: {
        hideMenu: true,
        title: t('routes.admin.bpmn'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/admin/workflow',
      },
      component: () => import('/@/views/admin/workflow/bpmn.vue'),
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
        title: t('routes.admin.log.system'),
      },
      children: [
        {
          path: 'login',
          name: 'LogLogin', // Login与登录页name重复会导致登录页路由被覆盖
          component: () => import('/@/views/admin/log/login/index.vue'),
          meta: {
            title: t('routes.admin.log.login'),
          },
        },
        {
          path: 'operation',
          name: 'Operation',
          component: () => import('/@/views/admin/log/operation/index.vue'),
          meta: {
            title: t('routes.admin.log.operation'),
          },
        },
      ],
    },
  ],
};

export default admin;
