<template>
  <div class="h-full flex p-4">
    <div class="flex flex-col pr-4 w-1/4 h-full">
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button type="primary" @click="handleCreate"> {{ t('common.create') }} </a-button>
        </template>
        <template #action="{ record }">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:edit-outlined',
                tooltip: t('common.rename'),
                onClick: handleRename.bind(null, record),
              },
              {
                icon: 'ant-design:download-outlined',
                tooltip: t('common.download'),
                onClick: handleDownload.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: t('common.delete'),
                popConfirm: {
                  title: t('common.delConfirm'),
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
            stopButtonPropagation
          />
        </template>
      </BasicTable>
    </div>
    <div ref="editorEl" class="flex-1 flex flex-col w-3/4 h-full vben-page-wrapper-content-bg">
      <div class="h-10 vben-collapse-container__header px-2 py-6">
        <div v-if="selected" class="vben-collapse-container__action">
          {{ t('common.active') }}
          <a-switch v-model:checked="active" @change="handleActive" />
          <button
            class="ant-btn ant-btn-primary ml-4"
            iconsize="14"
            type="button"
            @click="handleSave"
          >
            {{ t('common.save') }}
          </button>
        </div>
      </div>
      <PageWrapper dense contentFullHeight fixedHeight>
        <CodeEditor v-model:value="value" :mode="editMode" />
      </PageWrapper>
    </div>
    <FileModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, ref } from 'vue';
  import { Switch } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { CodeEditor } from '/@/components/CodeEditor';
  import { MODE } from '/@/components/CodeEditor/src/typing';
  import { PageWrapper } from '/@/components/Page';
  import { useLoading } from '/@/components/Loading';
  import { useModal } from '/@/components/Modal';
  import FileModal from './FileModal.vue';

  import { columns } from './data';
  import { GetModelContentResult } from '/@/api/system/model/modelModel';
  import { getModelList, getModelContent } from '/@/api/system/model';
  import { saveNode, download, deleteNode } from '/@/api/common';

  export default defineComponent({
    name: 'DataModel',
    components: { BasicTable, TableAction, CodeEditor, PageWrapper, FileModal, ASwitch: Switch },
    setup() {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const editorEl = ref(null);
      const [registerModal, { openModal }] = useModal();
      const [openWrapLoading, closeWrapLoading] = useLoading({
        target: editorEl,
        props: {
          tip: t('common.actioningText'),
          absolute: true,
        },
      });
      let destination = '';
      const data = reactive({
        value: '',
        editMode: MODE.HTML,
        active: false,
        selected: '',
      });

      const [registerTable, { reload, getRawDataSource }] = useTable({
        title: t('datamodel.list'),
        api: getModelList,
        columns,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 120,
          title: t('common.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        rowSelection: {
          type: 'radio',
          onChange: rowClick,
        },
      });

      async function rowClick(keys: string[]) {
        if (keys.length > 0) {
          data.selected = keys[0];
          openWrapLoading();
          const resData: GetModelContentResult = await getModelContent(keys[0]);
          data.value = resData['cm:content'];
          data.active = resData['cm:modelActive'];
          closeWrapLoading();
        } else {
          data.selected = '';
          data.value = '';
        }
      }

      function handleCreate() {
        if (destination == '') {
          const res = getRawDataSource();
          destination = res.destination;
        }
        openModal(true, {
          destination: destination,
        });
      }

      function handleRename(record: Recordable) {
        let { key, ...params } = record;
        if (params.cm_name.lastIndexOf('.') != -1) {
          params.cm_name = params.cm_name.substring(0, params.cm_name.lastIndexOf('.'));
        }
        openModal(true, {
          key: key,
          record: params,
        });
      }

      function handleDownload(record: Recordable) {
        let { key, cm_name: name } = record;
        download({ key, name });
      }

      async function handleDelete(record: Recordable) {
        await deleteNode(record.key);
        createMessage.success(t('common.delSuccess'));
        reload();
      }

      function handleSuccess() {
        reload();
      }

      async function handleSave() {
        const values = {
          key: data.selected,
          cm_content: data.value,
        };
        openWrapLoading();
        await saveNode(values);
        createMessage.success(t('common.saveSuccess'));
        closeWrapLoading();
      }

      async function handleActive(checked) {
        const values = {
          key: data.selected,
          properties: {
            cm_modelActive: checked,
          },
        };
        openWrapLoading();
        await saveNode(values);
        createMessage.success(t('datamodel.activeSuccess'));
        closeWrapLoading();
      }

      return {
        t,
        registerTable,
        registerModal,
        handleCreate,
        handleRename,
        handleDownload,
        handleDelete,
        handleSuccess,
        handleSave,
        handleActive,
        editorEl,
        ...toRefs(data),
      };
    },
  });
</script>
<style lang="less"></style>
