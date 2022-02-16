import { useI18n } from '/@/hooks/web/useI18n';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('workflow.fileName'),
    dataIndex: 'cm_name',
    width: 100,
    sorter: true,
  },
  {
    title: t('workflow.wfName'),
    dataIndex: 'cm_title',
    width: 80,
    sorter: true,
  },
  {
    title: t('workflow.status'),
    dataIndex: 'bpm_definitionDeployed',
    width: 50,
    sorter: true,
    slots: { customRender: 'bpm_definitionDeployed' },
  },
  {
    title: t('workflow.wfId'),
    dataIndex: 'bpm_definitionName',
    width: 60,
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
    label: t('workflow.fileOrWfName'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'deployed',
    component: 'Select',
    label: t('workflow.status'),
    colProps: { span: 8 },
    componentProps: {
      options: [
        {
          label: t('workflow.status1'),
          value: true,
          key: 'true',
        },
        {
          label: t('workflow.status2'),
          value: false,
          key: 'false',
        },
      ],
    },
  },
];
