/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  // modified by leencloud
  /* userId: string | number;
  token: string;
  role: RoleInfo; */
  data: {
    ticket: string;
  };
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  // modified by leencloud
  /* roles?: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string; */
  // 是否系统管理员
  isSysAdmin: boolean;
  // 用户id
  id: string | number;
  // 用户名
  name: string;
  // 头像
  avatar: string;
  // 邮件地址
  email?: string;
  // cas同步用户
  cas?: boolean;
  // 个人首页
  homePath?: string;
  // 角色
  roles?: RoleInfo[];
}
