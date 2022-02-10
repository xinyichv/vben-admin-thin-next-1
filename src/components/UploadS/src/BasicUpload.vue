<template>
  <div>
    <a-menu-item
      v-if="$props.renderType == 'menu'"
      :key="$props.renderMenuKey"
      @click="openUploadModal"
    >
      <slot></slot>
      {{ $props.renderText }}
    </a-menu-item>
    <a-button
      v-else
      :type="$props.renderType"
      @click="openUploadModal"
      :preIcon="$props.renderIcon"
    >
      {{ $props.renderText }}
    </a-button>

    <UploadModal
      v-bind="bindValue"
      :previewFileList="fileList"
      @register="registerUploadModal"
      @change="handleChange"
      @delete="handleDelete"
      @uploaddone="handleDone"
      @uploadsuccess="handleSuccess"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watch, unref, computed } from 'vue';
  import { Menu } from 'ant-design-vue';
  import UploadModal from './UploadModal.vue';
  import { useModal } from '/@/components/Modal';
  import { uploadContainerProps } from './props';
  import { omit } from 'lodash-es';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { isArray } from '/@/utils/is';

  export default defineComponent({
    name: 'BasicUpload',
    components: { UploadModal, AMenuItem: Menu.Item },
    props: uploadContainerProps,
    emits: ['change', 'delete', 'preview-delete', 'update:value', 'uploaddone', 'uploadsuccess'],

    setup(props, { emit, attrs }) {
      const { t } = useI18n();
      // 上传modal
      const [registerUploadModal, { openModal: openUploadModal }] = useModal();

      const fileList = ref<string[]>([]);

      const showPreview = computed(() => {
        const { emptyHidePreview } = props;
        if (!emptyHidePreview) return true;
        return emptyHidePreview ? fileList.value.length > 0 : true;
      });

      const bindValue = computed(() => {
        const value = { ...attrs, ...props };
        return omit(value, 'onChange');
      });

      watch(
        () => props.value,
        (value = []) => {
          fileList.value = isArray(value) ? value : [];
        },
        { immediate: true },
      );

      // 上传modal保存操作
      function handleChange(urls: string[]) {
        fileList.value = [...unref(fileList), ...(urls || [])];
        emit('update:value', fileList.value);
        emit('change', fileList.value);
      }

      function handleDelete(record: Recordable) {
        emit('delete', record);
      }

      function handleDone() {
        emit('uploaddone');
      }

      function handleSuccess(res: any) {
        emit('uploadsuccess', res);
      }

      function handlePreviewDelete(url: string) {
        emit('preview-delete', url);
      }

      return {
        registerUploadModal,
        openUploadModal,
        handleChange,
        fileList,
        showPreview,
        bindValue,
        handleDelete,
        handleDone,
        handleSuccess,
        handlePreviewDelete,
        t,
      };
    },
  });
</script>
