import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { getAuthorities } from '/@/api/admin/account';

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
    colProps: { span: 6 },
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
    colProps: { span: 5 },
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

export const userFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: t('account.id'),
    component: 'Input',
    required: true,
  },
  {
    field: 'firstName',
    label: t('account.name'),
    component: 'Input',
    required: true,
  },
  {
    field: 'email',
    label: t('account.email'),
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: t('account.password'),
    component: 'StrengthMeter',
    rules: [
      {
        required: true,
        message: t('account.passwordRequired'),
      },
    ],
    componentProps: {
      autocomplete: 'new-password',
      placeholder: t('common.inputText'),
    },
  },
  {
    field: 'passwordconfirm',
    label: t('account.passwordConfirm'),
    component: 'InputPassword',
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject(t('account.passwordConfirmRequired'));
            }
            if (value !== values.password) {
              return Promise.reject(t('account.passwordNotEqual'));
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
  {
    field: 'groups',
    label: t('account.organization'),
    component: 'ApiSelect',
    componentProps: {
      api: getAuthorities,
      params: {
        authorityType: 'group',
        maxResults: 500,
      },
      mode: 'multiple',
      showSearch: true,
      filterOption: false,
    },
  },
  {
    field: 'quata',
    label: t('account.quata'),
    component: 'InputNumber',
    helpMessage: t('account.quataHelp'),
    colProps: {
      span: 8,
    },
    suffix: 'GB',
  },
  {
    field: 'disableAccount',
    label: t('account.disableAccount'),
    component: 'Checkbox',
  },
];
