<template>
  <div>
    <BasicTable @register="registerTable" @expand="registerExpand">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> {{ t('category.create') }} </a-button>
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
    <CategoryDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getCategoryList, deleteCategory } from '/@/api/admin/category';

  import { useDrawer } from '/@/components/Drawer';
  import CategoryDrawer from './CategoryDrawer.vue';
  import { columns } from './data';

  import { getRowByKey, siblings, deleteRowByKey } from '/@/utils/jsonArray';

  export default defineComponent({
    name: 'Category',
    components: { BasicTable, CategoryDrawer, TableAction },
    setup() {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const [registerDrawer, { openDrawer: openDrawer }] = useDrawer();
      const [registerTable, { updateTableDataRecord, getDataSource }] = useTable({
        title: t('category.list'),
        api: getCategoryList,
        columns,
        isTreeTable: true,
        pagination: false,
        striped: false,
        useSearchForm: false,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 160,
          title: t('common.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function registerExpand(expanded: boolean, record: any) {
        if (expanded && record.children.length == 0) {
          const path: string = record.path;
          if (path && path != '') {
            const prePath = path.substring(19);
            let key = record.name;
            if (prePath && prePath != '') {
              key = prePath + '/' + key;
            }
            getCategoryList(key).then((res) => {
              record.children = res.items;
            });
          }
        }
      }

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        console.log('record', record);
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        deleteCategory(record.key);
        createMessage.success(t('common.delSuccess'));
        //deleteTableDataRecord(record.key); // 此方法不使用与treetable，因为删除时候没有去遍历children
        const tableData = getDataSource();
        deleteRowByKey(tableData, record.key);
      }

      function handleSuccess(res) {
        const tableData = getDataSource();
        if (res.action == 'create') {
          if (res.key && res.key != '') {
            const node = getRowByKey(tableData, res.key);
            const children = node?.children || [];
            children.push(res.record);
            children.sort(compare);
          } else {
            tableData.push(res.record);
            tableData.sort(compare);
          }
        } else if (res.action == 'update') {
          updateTableDataRecord(res.key, res.record);
          const nodes = siblings(tableData, res.key);
          nodes.sort(compare);
        }
      }

      function compare(a: Recordable, b: Recordable) {
        if (b.sort > a.sort) {
          return -1;
        } else if (b.sort < a.sort) {
          return 1;
        } else {
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return -1;
          } else if (b.name.toLowerCase() < a.name.toLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        }
      }

      return {
        t,
        registerTable,
        registerExpand,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
