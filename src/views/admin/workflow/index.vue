<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> {{ t('workflow.create') }} </a-button>
      </template>
      <template #bpm_definitionDeployed="{ record }">
        <a-switch
          :checked-children="t('workflow.status1')"
          :un-checked-children="t('workflow.status2')"
          v-model:checked="record.bpm_definitionDeployed"
          @change="(checked: boolean) => handleActive(record, checked)"
        />
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:edit-outlined',
              tooltip: t('common.edit'),
              onClick: handleEdit.bind(null, record),
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
        />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Switch } from 'ant-design-vue';

  import { useLoading } from '/@/components/Loading';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useGo } from '/@/hooks/web/usePage';

  import { getBpmByPage } from '/@/api/admin/workflow';
  import { saveNode, deleteNode } from '/@/api/common';

  import { columns, searchFormSchema } from './data';

  export default defineComponent({
    name: 'SiteManagement',
    components: { BasicTable, TableAction, ASwitch: Switch },
    setup() {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const go = useGo();
      const [openFullLoading, closeFullLoading] = useLoading({
        tip: t('common.actioningText'),
      });
      const [registerTable, { reload }] = useTable({
        title: t('workflow.list'),
        api: getBpmByPage,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 40,
          title: t('common.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleActive(record: Recordable, checked: boolean) {
        if (!Reflect.has(record, 'pendingStatus')) {
          record.pendingStatus = false;
        }
        record.pendingStatus = true;
        const newStatus = checked ? true : false;
        const { createMessage } = useMessage();
        saveNode({
          key: record.key,
          properties: {
            bpm_definitionDeployed: newStatus,
          },
        })
          .then(() => {
            createMessage.success(newStatus ? t('workflow.actived') : t('workflow.unactived'));
            reload();
          })
          .catch(() => {
            createMessage.error(newStatus ? t('workflow.activeFail') : t('workflow.unactiveFail'));
          })
          .finally(() => {
            record.pendingStatus = false;
          });
      }

      function handleCreate() {
        console.log('create');
        go('/admin/bpmn/create');
      }

      function handleEdit(record: Recordable) {
        console.log(record);
      }

      async function handleDelete(record: Recordable) {
        openFullLoading();
        deleteNode(record.key)
          .then(() => {
            createMessage.success(t('common.delSuccess'));
            reload();
          })
          .finally(() => {
            closeFullLoading();
          });
      }

      return {
        t,
        registerTable,
        handleActive,
        handleCreate,
        handleEdit,
        handleDelete,
      };
    },
  });
</script>
