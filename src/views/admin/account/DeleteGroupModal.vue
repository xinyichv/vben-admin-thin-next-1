<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    @ok="handleSubmit"
    :title="t('account.deleteConfirmTitle')"
  >
    <div>
      {{ t('account.deleteConfirmContent1') }}
      {{ deleteTarget }}，
      {{ t('account.deleteConfirmContent2') }}
      <div class="pt-10px pl-10px">
        <BasicForm @register="registerForm" />
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { removeGroup, deleteGroup } from '/@/api/admin/account';

  const { t } = useI18n();

  const schemas: FormSchema[] = [
    {
      field: 'actionType',
      component: 'RadioGroup',
      label: '',
      componentProps: {
        options: [
          {
            label: t('account.deleteGroup'),
            value: '1',
          },
          {
            label: t('account.removeGroup'),
            value: '2',
          },
        ],
      },
      defaultValue: '1',
    },
  ];
  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['success'],
    setup(_, { emit }) {
      const { createMessage } = useMessage();
      const parentGroup = ref('');
      const deleteId = ref('');
      const deleteName = ref('');
      const deleteTarget = computed(() => {
        return deleteName.value + '（' + deleteId.value.substring(6) + '）';
      });

      const [registerForm, { getFieldsValue }] = useForm({
        schemas,
        showActionButtonGroup: false,
      });

      const [register, { setModalProps, closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      function onDataReceive(data: any) {
        parentGroup.value = data.parentGroup;
        deleteId.value = data.deleteId;
        deleteName.value = data.deleteName;
      }

      function handleSubmit() {
        setModalProps({
          loading: true,
        });
        const vaules = getFieldsValue();
        if (vaules.actionType == '1') {
          deleteGroup(deleteId.value)
            .then(() => {
              createMessage.success(t('common.delSuccess'));
              closeModal();
              emit('success', {
                parentGroup: parentGroup.value,
              });
            })
            .finally(() => {
              setModalProps({
                loading: false,
              });
            });
        } else if (vaules.actionType == '2') {
          removeGroup(parentGroup.value, deleteId.value)
            .then(() => {
              createMessage.success(t('common.removeSuccess'));
              closeModal();
              emit('success', {
                parentGroup: parentGroup.value,
              });
            })
            .finally(() => {
              setModalProps({
                loading: false,
              });
            });
        }
      }

      return { t, register, schemas, registerForm, handleSubmit, deleteTarget };
    },
  });
</script>
