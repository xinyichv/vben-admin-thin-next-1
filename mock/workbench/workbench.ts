import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess, getRequestToken } from '../_util';

interface GroupItem {
  title: string;
  icon: string;
  color: string;
  desc: string;
  date: string;
  group: string;
}

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'vben',
      realName: 'Vben Admin',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      homePath: '/dashboard/analysis',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    },
    {
      userId: '2',
      username: 'test',
      password: '123456',
      realName: 'test user',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=339449197&s=640',
      desc: 'tester',
      token: 'fakeToken2',
      homePath: '/dashboard/workbench',
      roles: [
        {
          roleName: 'Tester',
          value: 'test',
        },
      ],
    },
    {
      userId: '3',
      username: 'admin',
      realName: 'Admin',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
      desc: 'manager',
      password: 'leencloud',
      token: 'fakeToken3',
      homePath: '/dashboard/analysis',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    },
  ];
}

export const groupItems: GroupItem[] = [
  {
    title: '企业知识库',
    icon: 'fa:book',
    color: 'green',
    desc: '共通站点',
    group: '张三',
    date: '2021-04-01',
  },
  {
    title: '管理部',
    icon: 'ph:cube-fill',
    color: '#e18525',
    desc: '部门站点',
    group: '李四',
    date: '2021-04-01',
  },
  {
    title: '工业齿轮箱',
    icon: 'et:gears',
    color: '#e18525',
    desc: '项目站点',
    group: '王五',
    date: '2021-04-01',
  },
  {
    title: '体系文件',
    icon: 'grommet-icons:send',
    color: '#bf0c2c',
    desc: '应用站点-体系文件',
    group: '王五',
    date: '2021-04-01',
  },
  {
    title: '市场部',
    icon: 'gis:earth-america-o',
    color: '#00d8ff',
    desc: '部门站点',
    group: '李四',
    date: '2021-04-01',
  },
  {
    title: '齿轮轴',
    icon: 'icon-park-outline:setting-config',
    color: '#4daf1bc9',
    desc: '项目站点',
    group: '张三',
    date: '2021-04-01',
  },
];
/**
 * TODO 后端可能需要新增接口
 * https://doc.alfrescocn.com/idoc/proxy/alfresco/api/people/admin/preferences?pf=idoc.recentsitee86efc50-3721-40f1-8fa4-bffb9da82786
 */
export default [
  {
    url: '/proxy/alfresco/getVisitedSites',
    timeout: 200,
    method: 'post',
    response: (request) => {
      const token = getRequestToken(request);
      if (!token) {
        return resultError('Invalid token!');
      }
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid user token!');
      }

      return resultSuccess(groupItems);
    },
  },
] as MockMethod[];
