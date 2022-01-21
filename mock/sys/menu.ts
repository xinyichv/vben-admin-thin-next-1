import { resultSuccess, resultError, getRequestToken, requestParams } from '../_util';
import { MockMethod } from 'vite-plugin-mock';
import { createFakeUserList } from './user';

// single
const dashboardRoute = {
  path: '/dashboard',
  name: 'Dashboard',
  component: 'LAYOUT',
  redirect: '/dashboard/analysis',
  meta: {
    title: 'routes.dashboard.dashboard',
    hideChildrenInMenu: true,
    icon: 'bx:bx-home',
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: '/dashboard/analysis/index',
      meta: {
        hideMenu: true,
        hideBreadcrumb: true,
        title: 'routes.dashboard.analysis',
        currentActiveMenu: '/dashboard',
        icon: 'bx:bx-home',
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: '/dashboard/workbench/index',
      meta: {
        hideMenu: true,
        hideBreadcrumb: true,
        title: 'routes.dashboard.workbench',
        currentActiveMenu: '/dashboard',
        icon: 'bx:bx-home',
      },
    },
  ],
};

const backRoute = {
  path: 'back',
  name: 'PermissionBackDemo',
  meta: {
    title: 'routes.demo.permission.back',
  },

  children: [
    {
      path: 'page',
      name: 'BackAuthPage',
      component: '/demo/permission/back/index',
      meta: {
        title: 'routes.demo.permission.backPage',
      },
    },
    {
      path: 'btn',
      name: 'BackAuthBtn',
      component: '/demo/permission/back/Btn',
      meta: {
        title: 'routes.demo.permission.backBtn',
      },
    },
  ],
};

const authRoute = {
  path: '/permission',
  name: 'Permission',
  component: 'LAYOUT',
  redirect: '/permission/front/page',
  meta: {
    icon: 'carbon:user-role',
    title: 'routes.demo.permission.permission',
  },
  children: [backRoute],
};

const levelRoute = {
  path: '/level',
  name: 'Level',
  component: 'LAYOUT',
  redirect: '/level/menu1/menu1-1',
  meta: {
    icon: 'carbon:user-role',
    title: 'routes.demo.level.level',
  },

  children: [
    {
      path: 'menu1',
      name: 'Menu1Demo',
      meta: {
        title: 'Menu1',
      },
      children: [
        {
          path: 'menu1-1',
          name: 'Menu11Demo',
          meta: {
            title: 'Menu1-1',
          },
          children: [
            {
              path: 'menu1-1-1',
              name: 'Menu111Demo',
              component: '/demo/level/Menu111',
              meta: {
                title: 'Menu111',
              },
            },
          ],
        },
        {
          path: 'menu1-2',
          name: 'Menu12Demo',
          component: '/demo/level/Menu12',
          meta: {
            title: 'Menu1-2',
          },
        },
      ],
    },
    {
      path: 'menu2',
      name: 'Menu2Demo',
      component: '/demo/level/Menu2',
      meta: {
        title: 'Menu2',
      },
    },
  ],
};

const sysRoute = {
  path: '/system',
  name: 'System',
  component: 'LAYOUT',
  redirect: '/system/account',
  meta: {
    icon: 'ion:settings-outline',
    title: 'routes.demo.system.moduleName',
  },
  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: 'routes.demo.system.account',
        ignoreKeepAlive: true,
      },
      component: '/demo/system/account/index',
    },
    {
      path: 'account_detail/:id',
      name: 'AccountDetail',
      meta: {
        hideMenu: true,
        title: 'routes.demo.system.account_detail',
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/system/account',
      },
      component: '/demo/system/account/AccountDetail',
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: 'routes.demo.system.role',
        ignoreKeepAlive: true,
      },
      component: '/demo/system/role/index',
    },

    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: 'routes.demo.system.menu',
        ignoreKeepAlive: true,
      },
      component: '/demo/system/menu/index',
    },
    {
      path: 'dept',
      name: 'DeptManagement',
      meta: {
        title: 'routes.demo.system.dept',
        ignoreKeepAlive: true,
      },
      component: '/demo/system/dept/index',
    },
    {
      path: 'changePassword',
      name: 'ChangePassword',
      meta: {
        title: 'routes.demo.system.password',
        ignoreKeepAlive: true,
      },
      component: '/demo/system/password/index',
    },
  ],
};

const linkRoute = {
  path: '/link',
  name: 'Link',
  component: 'LAYOUT',
  meta: {
    icon: 'ion:tv-outline',
    title: 'routes.demo.iframe.frame',
  },
  children: [
    {
      path: 'doc',
      name: 'Doc',
      meta: {
        title: 'routes.demo.iframe.doc',
        frameSrc: 'https://vvbin.cn/doc-next/',
      },
    },
    {
      path: 'https://vvbin.cn/doc-next/',
      name: 'DocExternal',
      component: 'LAYOUT',
      meta: {
        title: 'routes.demo.iframe.docExternal',
      },
    },
  ],
};
// idoc所有路由
const workbenchRoute = {
  path: '/workbench',
  name: 'Workbench',
  component: 'LAYOUT',
  redirect: '/workbench/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:dashboard-filled',
    title: 'routes.home.home',
    orderNo: 100,
  },
  children: [
    {
      path: 'index',
      name: 'WorkbenchPage',
      component: '/workbench/index.vue',
      meta: {
        title: 'routes.home.home',
        icon: 'ant-design:dashboard-filled',
        hideMenu: true,
      },
    },
  ],
};
const isodocRoute = {
  path: '/isodoc',
  name: 'ISODoc',
  component: 'LAYOUT',
  redirect: '/isodoc/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'grommet-icons:send',
    title: 'routes.isodoc.document',
    orderNo: 200,
  },
  children: [
    {
      path: 'index',
      name: 'ISODocPage',
      component: '/isodoc/document/index.vue',
      meta: {
        title: 'routes.isodoc.document',
        icon: 'grommet-icons:send',
        hideMenu: true,
      },
    },
  ],
};
const sitesRoute = {
  path: '/sites',
  name: 'Sites',
  component: 'LAYOUT',
  redirect: '/sites/list',
  meta: {
    hideChildrenInMenu: true,
    icon: 'mdi:sitemap',
    title: 'site.siteList',
    orderNo: 300,
  },
  children: [
    {
      path: 'list',
      name: 'SitesPage',
      component: '/site/list/index.vue',
      meta: {
        title: 'site.siteList',
        icon: 'mdi:sitemap',
        hideMenu: true,
      },
    },
  ],
};
const mytaskRoute = {
  path: '/mytask',
  name: 'Mytask',
  component: 'LAYOUT',
  redirect: '/mytask/todo',
  meta: {
    icon: 'mdi:alpha-p-circle',
    title: 'routes.mytask.task',
    orderNo: 400,
  },
  children: [
    {
      path: 'todo',
      name: 'TodoPage',
      component: '/mytask/todo/index.vue',
      meta: {
        title: 'routes.mytask.task',
        // icon: 'mdi:alpha-p-circle',
      },
    },
    {
      path: 'apply',
      name: 'ApplyPage',
      component: '/mytask/apply/index.vue',
      meta: {
        title: 'routes.mytask.apply',
        // icon: 'mdi:application-export',
      },
    },
  ],
};
const personalRoute = {
  path: '/personal',
  name: 'Personal',
  component: 'LAYOUT',
  redirect: '/personal/settings',
  meta: {
    icon: 'ic:baseline-person',
    title: 'routes.personal.settings',
    orderNo: 400,
  },
  children: [
    {
      path: 'settings',
      name: 'SettingsPage',
      component: '/personal/settings/index.vue',
      meta: {
        title: 'routes.personal.settings',
      },
    },
    {
      path: 'favorite',
      name: 'FavoritePage',
      component: '/personal/favorite/index.vue',
      meta: {
        title: 'routes.personal.favorite',
      },
    },
    {
      path: 'share',
      name: 'SharePage',
      component: '/personal/share/index.vue',
      meta: {
        title: 'routes.personal.share',
      },
    },
    {
      path: 'trash',
      name: 'TrashPage',
      component: '/personal/trash/index.vue',
      meta: {
        title: 'routes.personal.trash',
      },
    },
  ],
};
const systemRoute = {
  path: '/system',
  name: 'System',
  component: 'LAYOUT',
  redirect: '/system/setting',
  meta: {
    orderNo: 800,
    icon: 'ant-design:setting-filled',
    title: 'routes.system.system',
  },
  children: [
    {
      path: 'setting',
      name: 'Setting',
      component: '/system/setting/index.vue',
      meta: {
        title: 'routes.system.setting',
      },
    },
    {
      path: 'account',
      name: 'Account',
      component: '/system/account/index.vue',
      meta: {
        title: 'routes.system.account',
      },
    },
    {
      path: 'organize',
      name: 'Organize',
      component: '/system/organize/index.vue',
      meta: {
        title: 'routes.system.organize',
      },
    },
    {
      path: 'site',
      name: 'Site',
      component: '/system/site/index.vue',
      meta: {
        title: 'routes.system.site',
      },
    },
    {
      path: 'template',
      name: 'Template',
      redirect: '/system/template/file',
      meta: {
        title: 'routes.system.template.template',
      },
      children: [
        {
          path: 'file',
          name: 'File',
          component: '/system/template/file/index.vue',
          meta: {
            title: 'routes.system.template.file',
          },
        },
        {
          path: 'folder',
          name: 'Folder',
          component: '/system/template/folder/index.vue',
          meta: {
            title: 'routes.system.template.folder',
          },
        },
      ],
    },
    {
      path: 'datadic',
      name: 'Datadic',
      component: '/system/datadic/index.vue',
      meta: {
        title: 'routes.system.datadic',
      },
    },
    {
      path: 'navigate',
      name: 'Navigate',
      component: '/system/navigate/index.vue',
      meta: {
        title: 'routes.system.navigate',
      },
    },
    {
      path: 'category',
      name: 'Category',
      component: '/system/category/index.vue',
      meta: {
        title: 'routes.system.category',
      },
    },
    {
      path: 'tag',
      name: 'Tag',
      component: '/system/tag/index.vue',
      meta: {
        title: 'routes.system.tag',
      },
    },
    {
      path: 'folderrule',
      name: 'Folderrule',
      component: '/system/folderrule/index.vue',
      meta: {
        title: 'routes.system.folderrule',
      },
    },
    {
      path: 'dataModel',
      name: 'DataModel',
      component: '/system/dataModel/index.vue',
      meta: {
        title: 'routes.system.dataModel',
      },
    },
    {
      path: 'workflow',
      name: 'Workflow',
      component: '/system/workflow/index.vue',
      meta: {
        title: 'routes.system.workflow',
      },
    },
    {
      path: 'thirdparty',
      name: 'ThirdParty',
      component: '/system/thirdparty/index.vue',
      meta: {
        title: 'routes.thirdparty.thirdparty',
      },
    },
    {
      path: 'log',
      name: 'Log',
      redirect: '/system/log/system',
      meta: {
        title: 'routes.system.log.system',
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: '/system/log/login/index.vue',
          meta: {
            title: 'routes.system.log.login',
          },
        },
        {
          path: 'operation',
          name: 'Operation',
          component: '/system/log/operation/index.vue',
          meta: {
            title: 'routes.system.log.operation',
          },
        },
      ],
    },
  ],
};

export default [
  {
    url: '/proxy/alfresco/getMenuList',
    timeout: 1000,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return resultError('Invalid token!');
      }
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid user token!');
      }
      const id = checkUser.userId;
      let menu: Object[];
      // 模拟后台数据，根据不同用户返回不同的菜单
      switch (id) {
        case '1':
          dashboardRoute.redirect = dashboardRoute.path + '/' + dashboardRoute.children[0].path;
          menu = [dashboardRoute, authRoute, levelRoute, sysRoute, linkRoute];
          break;
        case '2':
          dashboardRoute.redirect = dashboardRoute.path + '/' + dashboardRoute.children[1].path;
          menu = [dashboardRoute, authRoute, levelRoute, linkRoute];
          break;
        case '3':
          menu = [workbenchRoute, isodocRoute, sitesRoute, mytaskRoute, personalRoute, systemRoute];
          break;
        default:
          menu = [];
      }
      return resultSuccess(menu);
    },
  },
] as MockMethod[];
