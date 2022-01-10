import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('site.name'),
    dataIndex: 'cm_title',
    width: 100,
    sorter: true,
  },
  {
    title: t('site.enname'),
    dataIndex: 'idoc_enname',
    width: 80,
    sorter: true,
  },
  {
    title: 'URL',
    dataIndex: 'cm_name',
    width: 80,
    sorter: true,
  },
  {
    title: t('site.siteType'),
    dataIndex: 'idoc_type',
    width: 60,
    sorter: true,
  },
  {
    title: t('common.creator'),
    dataIndex: 'cm_creator',
    width: 50,
    sorter: true,
  },
  {
    title: t('common.created'),
    dataIndex: 'cm_created',
    width: 50,
    sorter: true,
  },
  {
    title: t('common.modifier'),
    dataIndex: 'cm_modifier',
    width: 50,
    sorter: true,
  },
  {
    title: t('common.modified'),
    dataIndex: 'cm_modified',
    width: 50,
    sorter: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'key',
    label: t('site.siteNameOrURL'),
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'cm_title',
    component: 'Input',
    label: t('site.name'),
    required: true,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'idoc_enname',
    component: 'Input',
    label: t('site.enname'),
    colProps: {
      span: 12,
    },
  },
  {
    field: 'cm_name',
    component: 'Input',
    label: 'URL',
    helpMessage: t('site.urlHelp'),
    required: true,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'idoc_type',
    component: 'Select',
    label: t('site.siteType'),
    required: true,
    colProps: {
      span: 12,
    },
    componentProps: {
      options: [
        {
          label: t('site.siteType1'),
          value: '1',
          key: '1',
        },
        {
          label: t('site.siteType2'),
          value: '2',
          key: '2',
        },
        {
          label: t('site.siteType3'),
          value: '3',
          key: '3',
          disabled: true,
        },
        {
          label: t('site.siteType4'),
          value: '4',
          key: '4',
          disabled: true,
        },
      ],
    },
  },
  {
    field: 'idoc_subtype',
    component: 'Select',
    label: t('site.subType'),
    required: true,
    helpMessage: t('site.subTypeHelp'),
    colProps: {
      span: 12,
    },
    componentProps: {
      options: [
        {
          label: t('site.subType1'),
          value: '1',
          key: '1',
        },
        {
          label: t('site.subType2'),
          value: '2',
          key: '2',
        },
        {
          label: t('site.subType3'),
          value: '3',
          key: '3',
        },
      ],
    },
    show: ({ values }) => {
      return values.idoc_type == '1';
    },
  },
  {
    field: 'idoc_downloadlimit',
    component: 'Switch',
    label: t('site.downloadLimit'),
    helpMessage: t('site.downloadLimitHelp'),
    colProps: {
      span: 12,
    },
    show: ({ values }) => {
      return values.idoc_type == '1';
    },
  },
];
