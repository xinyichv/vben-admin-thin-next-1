<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> {{ t('site.create') }} </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: t('common.delConfirm'),
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <SiteDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getSiteByPage } from '/@/api/system/site';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useDrawer } from '/@/components/Drawer';
  import SiteDrawer from './SiteDrawer.vue';
  import { deleteSite } from '/@/api/system/site';
  import { BasicDelParams } from '/@/api/model/baseModel';

  import { columns, searchFormSchema } from './data';

  export default defineComponent({
    name: 'SiteManagement',
    components: { BasicTable, SiteDrawer, TableAction },
    setup() {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: t('site.siteList'),
        titleHelpMessage: t('site.siteListHelp'),
        api: getSiteByPage,
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
          fixed: undefined,
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        const keys: string[] = [];
        const key = record.cm_name;
        if (key) {
          keys.push(key);
        }
        const params: BasicDelParams = {
          keys: keys,
        };
        const data = await deleteSite(params);
        if (data && data.fail == 0) {
          createMessage.success(t('common.delSuccess'));
        } else {
          let errMsg: any = [];
          for (let i = 0; i < data.data.length; i++) {
            let detail = data.data[i];
            if (detail.success == 'false') {
              errMsg.push(detail.name);
            }
          }
          createMessage.error(t('site.delFail') + '<br>' + errMsg.join('<br>'));
        }
        reload();
      }

      function handleSuccess() {
        reload();
      }

      return {
        t,
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
