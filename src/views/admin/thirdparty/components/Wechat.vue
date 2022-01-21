<template>
  <CollapseContainer :title="t('system.wechat')" :canExpan="false">
    <a-row :gutter="24">
      <a-col :span="24">
        <BasicForm @register="register" />
      </a-col>
    </a-row>
    <Button type="primary" @click="handleSubmit"> {{ t('common.save') }} </Button>
  </CollapseContainer>
</template>
<script lang="ts">
  import { Button, Row, Col } from 'ant-design-vue';
  import { defineComponent, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useI18n } from '/@/hooks/web/useI18n';

  import { useMessage } from '/@/hooks/web/useMessage';

  import { getSysSetting, saveSysSetting } from '/@/api/system/thirdparty';
  import { wechatSetschemas } from '../data';

  export default defineComponent({
    components: {
      BasicForm,
      CollapseContainer,
      Button,
      ARow: Row,
      ACol: Col,
    },
    setup() {
      const { t } = useI18n();
      const { createMessage } = useMessage();

      const [register, { setFieldsValue, getFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: wechatSetschemas,
        showActionButtonGroup: false,
      });

      onMounted(async () => {
        let params = {};
        for (let i in wechatSetschemas) {
          let itemObj = wechatSetschemas[i];
          if (itemObj.itemProps && itemObj.itemProps.name) {
            params[itemObj.itemProps.name as string] = '';
          }
        }
        const data = await getSysSetting(params);
        setFieldsValue(data);
      });

      async function handleSubmit() {
        const formJson = getFieldsValue();
        let formData = new FormData();
        for (var i in formJson) {
          formData.append(i, formJson[i]);
        }
        const data = await saveSysSetting(formData);
        if (data && data.result == 'success') {
          createMessage.success(t('common.saveSuccess'));
        }
      }

      return {
        t,
        register,
        handleSubmit: handleSubmit,
      };
    },
  });
</script>

<style lang="less" scoped></style>
