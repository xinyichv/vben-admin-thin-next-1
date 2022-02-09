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
        <a-dropdown>
          <a-button>
            {{ t('common.import') }}
            <DownOutlined />
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="handleIpWechat">
                <WechatOutlined />
                {{ t('account.importWechat') }}
              </a-menu-item>
              <a-menu-item key="2">
                <DingdingOutlined />
                {{ t('account.importDingding') }}
              </a-menu-item>
              <a-menu-item key="3">{{ t('account.interfaceSetting') }}</a-menu-item>
              <a-menu-divider />
              <a-menu-item key="4">
                <FileExcelOutlined />
                {{ t('account.importExcel') }}
              </a-menu-item>
              <a-sub-menu key="5" :title="t('account.downloadTemplate')">
                <a-menu-item key="5_1">{{ t('account.dtxls') }}</a-menu-item>
                <a-menu-item key="5_2">{{ t('account.dtxlsx') }}</a-menu-item>
              </a-sub-menu>
            </a-menu>
          </template>
        </a-dropdown>
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
  import { Tag, Dropdown, Menu } from 'ant-design-vue';
  import {
    DownOutlined,
    WechatOutlined,
    DingdingOutlined,
    FileExcelOutlined,
  } from '@ant-design/icons-vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { deleteUser, getUserByPage, importWechat } from '/@/api/admin/account';
  import { ImportResult } from '/@/api/admin/model/account';
  import { PageWrapper } from '/@/components/Page';
  import GroupTree from './GroupTree.vue';

  import { useDrawer } from '/@/components/Drawer';
  import UserDrawer from './UserDrawer.vue';
  import UserEditDrawer from './UserEditDrawer.vue';

  import { columns, searchFormSchema } from './data';
  import { useGo } from '/@/hooks/web/usePage';
  import { useLoading } from '/@/components/Loading';

  export default defineComponent({
    name: 'AccountManagement',
    components: {
      Tag,
      ADropdown: Dropdown,
      AMenu: Menu,
      AMenuItem: Menu.Item,
      AMenuDivider: Menu.Divider,
      ASubMenu: Menu.SubMenu,
      DownOutlined,
      WechatOutlined,
      DingdingOutlined,
      FileExcelOutlined,
      BasicTable,
      PageWrapper,
      GroupTree,
      TableAction,
      UserDrawer,
      UserEditDrawer,
    },
    setup() {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();
      const go = useGo();
      const searchInfo = reactive<Recordable>({});
      const [openFullLoading, closeFullLoading] = useLoading({
        tip: t('common.actioningText'),
      });
      const [registerUserDrawer, { openDrawer: openUserDrawer }] = useDrawer();
      const [registerUserEditDrawer, { openDrawer: openUserEditDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
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
        openFullLoading();
        deleteUser(record.key)
          .then(() => {
            createMessage.success(t('common.delSuccess'));
            reload();
          })
          .finally(() => {
            closeFullLoading();
          });
      }

      function handleSelect(groupId = '') {
        searchInfo.groupId = groupId;
        reload();
      }

      function handleIpWechat() {
        createConfirm({
          iconType: 'warning',
          title: t('account.ipWechatTitle'),
          content: t('account.ipWechatContent'),
          onOk() {
            openFullLoading();
            importWechat()
              .then((res: ImportResult) => {
                if (res.result == 'success') {
                  let msg =
                    t('account.importSuccessAdd') +
                    res.add +
                    t('account.importSuccessDel') +
                    res.delete;
                  createMessage.success(msg);
                } else {
                  createMessage.error(res.msg);
                }
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
        registerUserDrawer,
        registerUserEditDrawer,
        handleCreateUser,
        handleUserSuccess,
        handleViewUser,
        handleEditUser,
        handleDeleteUser,
        handleSelect,
        searchInfo,
        handleIpWechat,
      };
    },
  });
</script>
