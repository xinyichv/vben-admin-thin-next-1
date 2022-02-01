<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <GroupTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #groups="{ record }">
        <template v-for="group in record.groups" :key="group.id">
          {{ group.name }}
          <template v-if="!group.isComplete">
            <br />
          </template>
        </template>
      </template>
      <template #disabled="{ record }">
        <Tag v-if="record.disabled" color="red"> {{ t('account.stsDisabled') }} </Tag>
        <Tag v-else color="green"> {{ t('account.stsEnabled') }} </Tag>
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">{{ t('account.createUser') }}</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:info-circle-outlined',
              tooltip: t('account.viewUser'),
              onClick: handleView.bind(null, record),
            },
            {
              icon: 'ant-design:edit-outlined',
              tooltip: t('account.editUser'),
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: t('account.deleteUser'),
              popConfirm: {
                title: t('common.delConfirm'),
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { Tag } from 'ant-design-vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getUserByPage } from '/@/api/admin/account';
  import { PageWrapper } from '/@/components/Page';
  import GroupTree from './GroupTree.vue';

  import { useModal } from '/@/components/Modal';
  import AccountModal from './AccountModal.vue';

  import { columns, searchFormSchema } from './data';
  import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    name: 'AccountManagement',
    components: { Tag, BasicTable, PageWrapper, GroupTree, AccountModal, TableAction },
    setup() {
      const { t } = useI18n();
      const go = useGo();
      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
        title: t('account.userList'),
        api: getUserByPage,
        columns,
        formConfig: {
          labelWidth: 80,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        handleSearchInfoFn(info) {
          console.log('handleSearchInfoFn', info);
          return info;
        },
        actionColumn: {
          width: 120,
          title: t('common.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        console.log(record);
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleSuccess({ isUpdate, values }) {
        if (isUpdate) {
          // 演示不刷新表格直接更新内部数据。
          // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
          const result = updateTableDataRecord(values.id, values);
          console.log(result);
        } else {
          reload();
        }
      }

      function handleSelect(groupId = '') {
        searchInfo.groupId = groupId;
        reload();
      }

      function handleView(record: Recordable) {
        go('/system/account_detail/' + record.id);
      }

      return {
        t,
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
        handleView,
        searchInfo,
      };
    },
  });
</script>
