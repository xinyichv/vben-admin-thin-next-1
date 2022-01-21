<template>
  <PageWrapper :title="t(currentRoute.meta.title)">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">开发中。</span>
      </div>
    </template>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { DescItem } from '/@/components/Description/index';
  import { useRouter } from 'vue-router';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();
  const { currentRoute } = useRouter();

  const { pkg } = __APP_INFO__;

  const { dependencies, devDependencies } = pkg;

  const schema: DescItem[] = [];
  const devSchema: DescItem[] = [];

  Object.keys(dependencies).forEach((key) => {
    schema.push({ field: key, label: key });
  });

  Object.keys(devDependencies).forEach((key) => {
    devSchema.push({ field: key, label: key });
  });
</script>
