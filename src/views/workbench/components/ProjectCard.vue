<template>
  <Card :title="t('routes.workbench.site')" v-bind="$attrs">
    <template #extra>
      <a-button type="link" size="small">{{ t('routes.workbench.more') }}</a-button>
    </template>

    <template v-for="item in items" :key="item">
      <CardGrid class="!md:w-1/3 !w-full">
        <span class="flex">
          <Icon :icon="item.icon" :color="item.color" size="30" />
          <span class="text-lg ml-4">{{ item.title }}</span>
        </span>
        <div class="flex mt-2 h-10 text-secondary">{{ item.desc }}</div>
        <div class="flex justify-between text-secondary">
          <span>{{ item.group }}</span>
          <span>{{ item.date }}</span>
        </div>
      </CardGrid>
    </template>
  </Card>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  // import { groupItems } from './data';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { getVisitedSites } from '/@/api/workbench/workbench';
  import { GroupItem } from '/@/api/workbench/model/visitedSites';

  export default defineComponent({
    components: { Card, CardGrid: Card.Grid, Icon },
    setup() {
      const { t } = useI18n();
      let groupItems = ref<GroupItem[]>([]);

      onMounted(async () => {
        // 实现站点
        groupItems.value = await getVisitedSites();
      });

      return { t, items: groupItems };
    },
  });
</script>
