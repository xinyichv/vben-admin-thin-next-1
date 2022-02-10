import type { PropType } from 'vue';
import { FileBasicColumn } from './typing';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const basicProps = {
  helpText: {
    type: String as PropType<string>,
    default: '',
  },
  // 文件最大多少MB，默认0不限制
  maxSize: {
    type: Number as PropType<number>,
    default: 0,
  },
  // 最大数量的文件，Infinity不限制
  maxNumber: {
    type: Number as PropType<number>,
    default: Infinity,
  },
  // 根据后缀，或者其他
  accept: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  multiple: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  uploadParams: {
    type: Object as PropType<any>,
    default: {},
  },
  api: {
    type: Function as PropType<PromiseFn>,
    default: null,
    required: true,
  },
  name: {
    type: String as PropType<string>,
    default: 'file',
  },
  filename: {
    type: String as PropType<string>,
    default: null,
  },
};

export const uploadContainerProps = {
  value: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  ...basicProps,
  showPreviewNumber: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  emptyHidePreview: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  renderType: {
    type: String as PropType<string>,
    default: 'primary',
  },
  renderMenuKey: {
    type: String as PropType<string>,
    default: '',
  },
  renderIcon: {
    type: String as PropType<string>,
    default: 'ant-design:upload-outlined',
  },
  renderText: {
    type: String as PropType<string>,
    default: t('component.upload.upload'),
  },
};

export const previewProps = {
  value: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
};

export const fileListProps = {
  columns: {
    type: [Array] as PropType<FileBasicColumn[]>,
    default: null,
  },
  actionColumn: {
    type: Object as PropType<FileBasicColumn>,
    default: null,
  },
  dataSource: {
    type: Array as PropType<any[]>,
    default: null,
  },
};
