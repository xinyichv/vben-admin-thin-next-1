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
        <a-button type="primary" @click="handleCreateUser">{{ t('account.createUser') }}</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:info-circle-outlined',
              tooltip: t('account.viewUser'),
              onClick: handleViewUser.bind(null, record),
            },
            {
              icon: 'ant-design:edit-outlined',
              tooltip: t('account.editUser'),
              onClick: handleEditUser.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: t('account.deleteUser'),
              popConfirm: {
                title: t('common.delConfirm'),
                confirm: handleDeleteUser.bind(null, record),
              },
              ifShow: (_action) => {
                return record.key !== 'admin' && record.key !== 'guest';
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <UserDrawer @register="registerUserDrawer" @success="handleUserSuccess" />
    <UserEditDrawer @register="registerUserEditDrawer" @success="handleUserSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { Tag } from 'ant-design-vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { deleteUser, getUserByPage } from '/@/api/admin/account';
  import { PageWrapper } from '/@/components/Page';
  import GroupTree from './GroupTree.vue';

  import { useDrawer } from '/@/components/Drawer';
  import UserDrawer from './UserDrawer.vue';
  import UserEditDrawer from './UserEditDrawer.vue';

  import { columns, searchFormSchema } from './data';
  import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    name: 'AccountManagement',
    components: {
      Tag,
      BasicTable,
      PageWrapper,
      GroupTree,
      TableAction,
      UserDrawer,
      UserEditDrawer,
    },
    setup() {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const go = useGo();
      const searchInfo = reactive<Recordable>({});
      const [registerUserDrawer, { openDrawer: openUserDrawer }] = useDrawer();
      const [registerUserEditDrawer, { openDrawer: openUserEditDrawer }] = useDrawer();
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

      function handleCreateUser() {
        openUserDrawer(true, {
          isUpdate: false,
        });
      }

      function handleUserSuccess() {
        reload();
      }

      function handleViewUser(record: Recordable) {
        go('/admin/account_detail/' + record.key);
      }

      function handleEditUser(record: Recordable) {
        openUserEditDrawer(true, {
          record,
        });
      }

      function handleDeleteUser(record: Recordable) {
        deleteUser(record.key).then(() => {
          createMessage.success(t('common.delSuccess'));
          reload();
        });
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

      return {
        t,
        registerTable,
        registerUserDrawer,
        registerUserEditDrawer,
        handleCreateUser,
        handleUserSuccess,
        handleViewUser,
        handleEditUser,
        handleDeleteUser,
        handleSuccess,
        handleSelect,
        searchInfo,
      };
    },
  });
</script>
