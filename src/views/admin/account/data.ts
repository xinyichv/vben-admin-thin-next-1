import { getAllRoleList, isAccountExist } from '/@/api/demo/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('account.id'),
    dataIndex: 'key',
    width: 120,
  },
  {
    title: t('account.name'),
    dataIndex: 'cm_firstName',
    width: 120,
  },
  {
    title: t('account.email'),
    dataIndex: 'cm_email',
    width: 140,
  },
  {
    title: t('account.organization'),
    dataIndex: 'groups',
    width: 150,
    slots: { customRender: 'groups' },
  },
  {
    title: t('account.status'),
    dataIndex: 'disabled',
    width: 80,
    slots: { customRender: 'disabled' },
  },
  {
    title: t('account.from'),
    dataIndex: 'from',
    width: 80,
    customRender: ({ record }) => {
      return t('account.from' + record.from);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'userId',
    label: t('account.id'),
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'userName',
    label: t('account.name'),
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'status',
    component: 'Select',
    label: t('account.status'),
    colProps: { span: 6 },
    componentProps: {
      options: [
        {
          label: t('account.stsEnabled'),
          value: 'enabled',
          key: 'enabled',
        },
        {
          label: t('account.stsDisabled'),
          value: 'disabled',
          key: 'disabled',
        },
      ],
    },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用户名',
    component: 'Input',
    helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            isAccountExist(value)
              .then(() => resolve())
              .catch((err) => {
                reject(err.message || '验证失败');
              });
          });
        },
      },
    ],
  },
  {
    field: 'pwd',
    label: '密码',
    component: 'InputPassword',
    required: true,
    ifShow: false,
  },
  {
    label: '角色',
    field: 'role',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'roleName',
      valueField: 'roleValue',
    },
    required: true,
  },
  {
    field: 'dept',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'deptName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    required: true,
  },

  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
  },

  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
