<template>
  <CollapseContainer title="微信" :canExpan="false">
    <a-row :gutter="24">
      <a-col :span="24">
        <BasicForm @register="register" />
      </a-col>
    </a-row>
    <Button type="primary" @click="handleSubmit"> 保存 </Button>
  </CollapseContainer>
</template>
<script lang="ts">
  import { Button, Row, Col } from 'ant-design-vue';
  import { computed, defineComponent, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';

  import { useMessage } from '/@/hooks/web/useMessage';

  import headerImg from '/@/assets/images/header.jpg';
  import { wechatSettingApi } from '/@/api/system/thirdparty';
  import { wechatSetschemas } from '../data';
  import { useUserStore } from '/@/store/modules/user';
  import { uploadApi } from '/@/api/sys/upload';

  export default defineComponent({
    components: {
      BasicForm,
      CollapseContainer,
      Button,
      ARow: Row,
      ACol: Col,
    },
    setup() {
      const { createMessage } = useMessage();
      const userStore = useUserStore();

      const [register, { setFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: wechatSetschemas,
        showActionButtonGroup: false,
      });

      onMounted(async () => {
        const data = await wechatSettingApi();
        setFieldsValue(data);
      });

      const avatar = computed(() => {
        const { avatar } = userStore.getUserInfo;
        return avatar || headerImg;
      });

      function updateAvatar(src: string) {
        const userinfo = userStore.getUserInfo;
        userinfo.avatar = src;
        userStore.setUserInfo(userinfo);
      }

      return {
        avatar,
        register,
        uploadApi: uploadApi as any,
        updateAvatar,
        handleSubmit: () => {
          createMessage.success('更新成功！');
        },
      };
    },
  });
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
