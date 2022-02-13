import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('tag.tagName'),
    dataIndex: 'name',
    width: 120,
  },
  {
    title: t('common.creator'),
    dataIndex: 'creator',
    width: 80,
  },
  {
    title: t('common.created'),
    dataIndex: 'created',
    width: 100,
  },
  {
    title: t('common.modifier'),
    dataIndex: 'modifier',
    width: 80,
  },
  {
    title: t('common.modified'),
    dataIndex: 'modified',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'key',
    label: t('tag.tagName'),
    component: 'Input',
    colProps: { span: 8 },
  },
];
