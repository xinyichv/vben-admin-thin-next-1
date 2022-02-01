<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <BasicTree
      :title="t('account.grouplist')"
      toolbar
      search
      :clickRowToExpand="false"
      :treeData="treeData"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { getRootGroups } from '/@/api/admin/account';

  export default defineComponent({
    name: 'GroupTree',
    components: { BasicTree },

    emits: ['select'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const treeData = ref<TreeItem[]>([]);

      async function fetch() {
        treeData.value = (await getRootGroups(null)) as unknown as TreeItem[];
      }

      function handleSelect(keys) {
        emit('select', keys[0]);
      }

      onMounted(() => {
        fetch();
      });
      return { t, treeData, handleSelect };
    },
  });
</script>
