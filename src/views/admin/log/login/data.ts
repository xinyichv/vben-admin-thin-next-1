import { useI18n } from '/@/hooks/web/useI18n';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('log.account'),
    dataIndex: 'user',
    width: '30%',
  },
  {
    title: t('log.name'),
    dataIndex: 'values',
    width: '30%',
    customRender: ({ text }) => {
      if (text && text['/auditlogin/login/user']) {
        return text['/auditlogin/login/user'];
      } else {
        return '';
      }
    },
  },
  {
    title: t('log.loginTime'),
    dataIndex: 'time',
    sorter: true,
    customRender: ({ text }) => {
      return formatToDateTime(text);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'user',
    label: t('log.account'),
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'fromTime',
    label: t('log.fromTime'),
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
    },
    colProps: { span: 6 },
  },
  {
    field: 'toTime',
    label: t('log.toTime'),
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
    },
    colProps: { span: 6 },
  },
];
