<template>
  <PageWrapper title="我的分享">
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
