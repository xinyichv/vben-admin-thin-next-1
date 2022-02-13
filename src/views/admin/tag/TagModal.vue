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
  import { saveTag } from '/@/api/admin/tag';

  const { t } = useI18n();
  const formSchema: FormSchema[] = [
    {
      field: 'name',
      component: 'Input',
      label: t('tag.tagName'),
      required: true,
    },
  ];
  export default defineComponent({
    name: 'TagModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { createMessage } = useMessage();
      const key = ref('');

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        autoFocusFirstItem: true,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        key.value = data?.key;
        resetFields();
        setModalProps({ confirmLoading: false });
        if (key.value !== '') {
          setFieldsValue({
            name: key.value,
          });
        }
      });

      const getTitle = computed(() => (key.value == '' ? t('common.create') : t('common.rename')));

      async function handleSubmit() {
        const values = await validate();
        setModalProps({ confirmLoading: true });
        saveTag(key.value, values)
          .then((res) => {
            if (res.result == true) {
              createMessage.success(t('tag.renameSuccess'));
              emit('success');
            } else {
              createMessage.error(res.msg ? res.msg : t('common.actionFail'));
            }
          })
          .finally(() => {
            setModalProps({ confirmLoading: false });
            closeModal();
          });
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
