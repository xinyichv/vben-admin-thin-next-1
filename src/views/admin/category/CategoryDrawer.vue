<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="600px"
    :maskClosable="false"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { createCategory, updateCategory } from '/@/api/admin/category';
  import { pick } from 'lodash-es';

  export default defineComponent({
    name: 'CategoryDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const isUpdate = ref(true);
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? t('category.create') : t('category.edit'),
      );

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          let rtnParams;
          if (!values.key || values.key == '') {
            const key = values.parentCategory || '';
            const res = await createCategory(key, pick(values, ['name', 'sort']));
            rtnParams = {
              action: 'create',
              key: key.replace('workspace://SpacesStore/', ''),
              record: {
                ...values,
                key: res.persistedObject
                  ? res.persistedObject.replace('workspace://SpacesStore/', '')
                  : '',
              },
            };
          } else {
            await updateCategory(values.key, pick(values, ['name', 'sort']));
            rtnParams = {
              action: 'update',
              key: values.key,
              record: values,
            };
          }
          createMessage.success(t('common.saveSuccess'));
          closeDrawer();
          emit('success', rtnParams);
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
