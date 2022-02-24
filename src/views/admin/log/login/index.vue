<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="openExportModal"> {{ t('log.export') }} </a-button>
        <a-button @click="handleClear"> {{ t('log.clear') }} </a-button>
      </template>
    </BasicTable>
    <ExpExcelModal @register="registerExportModal" @success="doExport" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useLoading } from '/@/components/Loading';
  import { BasicTable, useTable } from '/@/components/Table';
  import { jsonToSheetXlsx, ExpExcelModal, ExportModalResult } from '/@/components/Excel';
  import { useModal } from '/@/components/Modal';
  import { formatToDateTime } from '/@/utils/dateUtil';

  import { columns, searchFormSchema } from './data';
  import { getLoginByPage, clearLogLogin } from '/@/api/admin/log';

  export default defineComponent({
    name: 'LogLogin',
    components: { BasicTable, ExpExcelModal },
    setup() {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();

      const [openFullLoading, closeFullLoading] = useLoading({
        tip: t('common.actioningText'),
      });

      const [registerTable, { reload, getDataSource }] = useTable({
        title: t('log.list'),
        api: getLoginByPage,
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
      });

      const [registerExportModal, { openModal: openExportModal }] = useModal();

      function doExport({ filename, bookType }: ExportModalResult) {
        const tableDatas = getDataSource();
        let data: any[] = [];
        for (let i = 0; i < tableDatas.length; i++) {
          let tData = tableDatas[i];
          data.push({
            account: tData.user,
            user: tData.values['/auditlogin/login/user'],
            time: formatToDateTime(tData.time),
          });
        }
        const header = {
          account: columns[0].title,
          user: columns[1].title,
          time: columns[2].title,
        };
        jsonToSheetXlsx({
          data,
          header,
          filename,
          write2excelOpts: {
            bookType,
          },
        });
      }

      function handleClear() {
        createConfirm({
          iconType: 'warning',
          title: t('log.clearConfirmTitle'),
          content: t('log.clearConfirmContent'),
          onOk() {
            openFullLoading();
            clearLogLogin()
              .then(() => {
                createMessage.success(t('common.actionSuccess'));
                reload();
              })
              .finally(() => {
                closeFullLoading();
              });
          },
        });
      }

      return {
        t,
        registerTable,
        registerExportModal,
        openExportModal,
        doExport,
        handleClear,
      };
    },
  });
</script>
