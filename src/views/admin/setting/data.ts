import { FormSchema } from '/@/components/Form/index';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

// tab的list
export const settingList = [
  {
    key: '1',
    name: t('setting.baseSetting'),
    component: 'BaseSetting',
  },
];

// 基本设置 form
export const baseSettingForm: FormSchema[] = [
  {
    field: 'divider-site',
    component: 'Divider',
    label: t('setting.site'),
  },
  {
    field: 'idoc_autoversion',
    component: 'Switch',
    label: t('setting.autoVersion'),
    defaultValue: 'true',
    itemProps: {
      extra: t('setting.autoVersionHelp'),
    },
    componentProps: {
      checkedValue: 'true',
      unCheckedValue: 'false',
    },
  },
  {
    field: 'idoc_maxversion',
    component: 'InputNumber',
    label: t('setting.maxVersion'),
    defaultValue: '20',
    itemProps: {
      extra: t('setting.maxVersionHelp'),
    },
  },
  {
    field: 'idoc_dupname',
    component: 'RadioGroup',
    label: t('setting.duplicateAction'),
    defaultValue: '2',
    itemProps: {
      extra: t('setting.duplicateActionHelp'),
    },
    componentProps: {
      options: [
        {
          label: t('setting.duplicateAction1'),
          value: '1',
        },
        {
          label: t('setting.duplicateAction2'),
          value: '2',
        },
      ],
    },
  },
  {
    field: 'idoc_officeview',
    component: 'RadioGroup',
    label: t('setting.previewMode'),
    defaultValue: 'viewer',
    itemProps: {
      extra: t('setting.previewModeHelp'),
    },
    componentProps: {
      options: [
        {
          label: t('setting.previewMode1'),
          value: 'viewer',
        },
        {
          label: t('setting.previewMode2'),
          value: 'onlyoffice',
        },
      ],
    },
  },
];
