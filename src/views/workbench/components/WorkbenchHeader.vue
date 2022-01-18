<template>
  <div class="lg:flex">
    <Avatar :src="avatar || headerImg" :size="72" class="!mx-auto !block" />
    <div class="md:ml-6 flex flex-col justify-center md:mt-0 mt-2">
      <h1 class="md:text-lg text-md">您好，{{ userinfo.name }}，欢迎使用iDoc企业文档管理系统！</h1>
      <span class="text-secondary"> 预留空位，以后滚动显示系统公告标题，点击后打开公告详情页 </span>
    </div>
    <div class="flex flex-1 justify-end md:mt-0 mt-4">
      <div class="flex flex-col justify-center text-right">
        <router-link to="/mytask/todo">
          <span class="text-secondary"> 待办 </span>
        </router-link>
        <router-link to="/mytask/todo">
          <span class="text-2xl">2</span>
        </router-link>
      </div>

      <div class="flex flex-col justify-center text-right md:mx-16 mx-12">
        <span class="text-secondary"> 本月更新 </span>
        <span class="text-2xl">8</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mr-10 mr-4">
        <span class="text-secondary"> 本月新增 </span>
        <span class="text-2xl">300</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { Avatar } from 'ant-design-vue';
  import { useUserStore } from '/@/store/modules/user';
  import headerImg from '/@/assets/images/header.jpg';

  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);
  const avatar = computed(() => userStore.getUserAvatar);
</script>
