<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <BasicTree
      :title="t('account.grouplist')"
      toolbar
      :clickRowToExpand="false"
      :treeData="treeData"
      :load-data="onLoadData"
      :actionList="groupActionList"
      @select="handleSelect"
      ref="treeRef"
    />
    <GroupDrawer @register="registerGroupDrawer" @success="handleGroupSuccess" />
    <DeleteGroupModal
      @register="registerModal"
      @success="handleDeleteSuccess"
      :canFullscreen="false"
      :minHeight="80"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, unref, h } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useModal } from '/@/components/Modal';
  import { BasicTree, TreeActionItem, TreeActionType, TreeItem } from '/@/components/Tree/index';
  import { getRootGroups, getChildGroups, deleteGroup } from '/@/api/admin/account';
  import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
  import { useDrawer } from '/@/components/Drawer';
  import { useLoading } from '/@/components/Loading';
  import GroupDrawer from './GroupDrawer.vue';
  import DeleteGroupModal from './DeleteGroupModal.vue';

  export default defineComponent({
    name: 'GroupTree',
    components: { BasicTree, GroupDrawer, DeleteGroupModal },

    emits: ['select'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const treeData = ref<TreeItem[]>([]);

      const [openFullLoading, closeFullLoading] = useLoading({
        tip: t('common.actioningText'),
      });

      function getTree() {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      }

      const groupActionList: TreeActionItem[] = [
        {
          render: (node) => {
            return h(EditOutlined, {
              class: 'ml-2',
              onClick: (e) => {
                const groupId = node.key;
                const shortGroupId = groupId.substring(6);
                const nodeText = getTree().getNodeTextByKey(groupId);
                openGroupDrawer(true, {
                  isUpdate: true,
                  key: node.key,
                  groupId: shortGroupId,
                  groupName: nodeText,
                });
                e.stopPropagation();
              },
            });
          },
        },
        {
          render: (node) => {
            return h(PlusOutlined, {
              onClick: (e) => {
                openGroupDrawer(true, {
                  isUpdate: false,
                  key: '',
                  parentGroup: node.key,
                });
                e.stopPropagation();
              },
            });
          },
        },
        {
          show: (node) => {
            if (node.key == 'GROUP_ALFRESCO_ADMINISTRATORS') {
              return false;
            } else {
              return true;
            }
          },
          render: (node) => {
            return h(DeleteOutlined, {
              onClick: (e) => {
                const groupId = node.key;
                const treeAction = getTree();
                const parentId = treeAction.getParentIdByKey(groupId);
                const nodeText = treeAction.getNodeTextByKey(groupId);
                if (parentId != '') {
                  openModal(true, {
                    deleteId: groupId,
                    deleteName: nodeText,
                    parentGroup: parentId,
                  });
                } else {
                  createConfirm({
                    iconType: 'warning',
                    title: t('account.deleteConfirmTitle'),
                    content:
                      t('account.deleteGroupConfirm') +
                      nodeText +
                      '（' +
                      groupId.substring(6) +
                      '）' +
                      '，' +
                      t('account.deleteGroupConfirmSub'),
                    onOk() {
                      openFullLoading();
                      deleteGroup(groupId)
                        .then(() => {
                          createMessage.success(t('common.delSuccess'));
                          fetch();
                        })
                        .finally(() => {
                          closeFullLoading();
                        });
                    },
                  });
                }
                e.stopPropagation();
              },
            });
          },
        },
      ];

      const [registerGroupDrawer, { openDrawer: openGroupDrawer }] = useDrawer();
      const [registerModal, { openModal }] = useModal();

      async function fetch() {
        treeData.value = (await getRootGroups(null)) as unknown as TreeItem[];
      }

      function handleSelect(keys) {
        emit('select', keys[0]);
      }

      async function onLoadData(treeNode: any) {
        return getChildGroups(treeNode.eventKey, {
          skipCount: 0,
          maxItems: 1000,
          sortBy: 'displayName',
        }).then((res) => {
          const asyncTreeAction: TreeActionType | null = getTree();
          if (asyncTreeAction && res.data && res.data.length > 0) {
            const nodeChildren: any[] = [];
            for (let i = 0; i < res.data.length; i++) {
              let row = res.data[i];
              nodeChildren.push({
                key: row.fullName,
                title: row.displayName,
              });
            }
            asyncTreeAction.updateNodeByKey(treeNode.eventKey, { children: nodeChildren });
            asyncTreeAction.setExpandedKeys([
              treeNode.eventKey,
              ...asyncTreeAction.getExpandedKeys(),
            ]);
          }
        });
      }

      function handleGroupSuccess(res: any) {
        if (res.action == 'update') {
          if (res.key && res.key != '' && res.title && res.title != '') {
            getTree().updateNodeByKey(res.key, {
              title: res.title,
            });
          }
        } else if (res.action == 'reload') {
          if (res.key && res.key != '') {
            onLoadData({
              eventKey: res.key,
            });
          } else {
            fetch();
          }
        }
      }

      function handleDeleteSuccess(res: any) {
        if (res.parentGroup && res.parentGroup != '') {
          onLoadData({
            eventKey: res.parentGroup,
          });
        } else {
          fetch();
        }
      }

      onMounted(() => {
        fetch();
      });
      return {
        t,
        treeData,
        onLoadData,
        handleSelect,
        treeRef,
        groupActionList,
        registerGroupDrawer,
        handleGroupSuccess,
        registerModal,
        openModal,
        handleDeleteSuccess,
      };
    },
  });
</script>
