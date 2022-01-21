<template>
  <BasicModal
    v-bind="$attrs"
    :title="getTitle"
    :minHeight="50"
    @register="registerModal"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { saveNode } from '/@/api/common';

  const { t } = useI18n();
  const formSchema: FormSchema[] = [
    {
      field: 'cm_name',
      component: 'Input',
      label: t('datamodel.modelname'),
      labelWidth: 140,
      required: true,
      renderComponentContent: () => {
        return {
          suffix: () => '.xml',
        };
      },
    },
  ];
  export default defineComponent({
    name: 'FileModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { createMessage } = useMessage();
      const destination = ref('');
      const key = ref('');

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        autoFocusFirstItem: true,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        destination.value = data?.destination;
        key.value = data?.key;
        resetFields();
        setModalProps({ confirmLoading: false });
        if (key.value !== '') {
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => (key.value == '' ? t('common.create') : t('common.rename')));

      async function handleSubmit() {
        try {
          const values = await validate();
          values.destination = destination.value;
          values.key = key.value;
          values.cm_name = values.cm_name + '.xml';
          setModalProps({ confirmLoading: true });
          await saveNode(values);
          createMessage.success(t('common.saveSuccess'));
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        getTitle,
        registerModal,
        registerForm,
        handleSubmit,
      };
    },
  });
</script>
<style lang="less"></style>
