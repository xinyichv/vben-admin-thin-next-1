<template>
  <CollapseContainer :title="t('setting.baseSetting')" :canExpan="false">
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

  import { getSysSetting, saveSysSetting } from '/@/api/admin/thirdparty';
  import { baseSettingForm } from '../data';

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
        labelWidth: 200,
        schemas: baseSettingForm,
        showActionButtonGroup: false,
      });

      onMounted(async () => {
        let params = {};
        for (let i in baseSettingForm) {
          let itemObj = baseSettingForm[i];
          if (itemObj.component != 'Divider') {
            params[itemObj.field as string] = itemObj.defaultValue ? itemObj.defaultValue : '';
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
