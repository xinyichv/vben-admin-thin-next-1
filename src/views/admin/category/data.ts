import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { getCategoryTree } from '/@/api/admin/category';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('category.name'),
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: t('category.sort'),
    dataIndex: 'sort',
    width: 100,
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'key',
    label: 'key',
    component: 'Input',
    show: false,
  },
  {
    field: 'parentCategory',
    label: t('category.parentCategory'),
    component: 'ApiTreeSelect',
    componentProps: {
      api: getCategoryTree,
    },
    ifShow: ({ values }) => {
      return !values.key || values.key == '';
    },
  },
  {
    field: 'name',
    label: t('category.name'),
    component: 'Input',
    required: true,
  },
  {
    field: 'sort',
    label: t('category.sort'),
    component: 'InputNumber',
    defaultValue: 99,
  },
];
