<template>
  <div>
    <BasicTable @register="registerTable">
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
    <TagModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { useModal } from '/@/components/Modal';
  import { useLoading } from '/@/components/Loading';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import TagModal from './TagModal.vue';

  import { getTagByPage, deleteTag } from '/@/api/admin/tag';
  import { columns, searchFormSchema } from './data';

  export default defineComponent({
    name: 'SiteManagement',
    components: { BasicTable, TableAction, TagModal },
    setup() {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const [registerModal, { openModal }] = useModal();
      const [openFullLoading, closeFullLoading] = useLoading({
        tip: t('common.actioningText'),
      });
      const [registerTable, { reload }] = useTable({
        title: t('tag.tagList'),
        api: getTagByPage,
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

      function handleEdit(record: Recordable) {
        openModal(true, {
          key: record.name,
        });
      }

      async function handleDelete(record: Recordable) {
        console.log(record);
        openFullLoading();
        deleteTag(record.name)
          .then((res) => {
            if (res.result == true) {
              createMessage.success(t('common.delSuccess'));
              reload();
            } else {
              createMessage.error(res.msg ? res.msg : t('common.actionFail'));
            }
          })
          .finally(() => {
            closeFullLoading();
          });
      }

      function handleSuccess() {
        reload();
      }

      return {
        t,
        registerTable,
        handleEdit,
        handleDelete,
        handleSuccess,
        registerModal,
      };
    },
  });
</script>
