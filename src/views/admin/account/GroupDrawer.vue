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
    <div ref="formEl">
      <BasicForm @register="registerForm" />
    </div>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { groupFormSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { createOrAddChildGroup, updateGroup, createRootGroup } from '/@/api/admin/account';
  import { useLoading } from '/@/components/Loading';

  export default defineComponent({
    name: 'GroupDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const { createMessage, createErrorModal } = useMessage();
      const formEl = ref(null);
      const isUpdate = ref(true);

      const [openWrapLoading, closeWrapLoading] = useLoading({
        target: formEl.value,
        props: {
          tip: t('common.actioningText'),
          absolute: true,
        },
      });

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: groupFormSchema,
        showActionButtonGroup: false,
        autoFocusFirstItem: true,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });

        isUpdate.value = !!data?.isUpdate;

        setFieldsValue({
          ...data,
        });
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? t('account.createGroup') : t('account.editGroup'),
      );

      async function handleSubmit() {
        try {
          let values = await validate();
          setDrawerProps({ confirmLoading: true });
          openWrapLoading();

          if (unref(isUpdate)) {
            updateGroup(values.groupId, {
              displayName: values.groupName,
            })
              .then(() => {
                createMessage.success(t('common.saveSuccess'));
              })
              .finally(() => {
                closeWrapLoading();
                closeDrawer();
                emit('success', {
                  action: 'update',
                  key: values.key,
                  title: values.groupName,
                });
              });
          } else {
            if (values.createType == '0') {
              const parentGroup = values.parentGroup;
              if (parentGroup && parentGroup != '') {
                createOrAddChildGroup(parentGroup, values.groupId)
                  .then(() => {
                    if (values.groupId != values.groupName) {
                      updateGroup(values.groupId, {
                        displayName: values.groupName,
                      }).then(() => {
                        createMessage.success(t('common.saveSuccess'));
                      });
                    } else {
                      createMessage.success(t('common.saveSuccess'));
                    }
                  })
                  .catch(() => {
                    createErrorModal({
                      title: t('sys.api.errorTip'),
                      content: t('account.createGroupErr'),
                    });
                  })
                  .finally(() => {
                    closeWrapLoading();
                    closeDrawer();
                    emit('success', {
                      action: 'reload',
                      key: parentGroup,
                    });
                  });
              } else {
                createRootGroup(values.groupId, {
                  displayName: values.groupName,
                })
                  .then(() => {
                    createMessage.success(t('common.saveSuccess'));
                  })
                  .catch(() => {
                    createErrorModal({
                      title: t('sys.api.errorTip'),
                      content: t('account.createGroupErr'),
                    });
                  })
                  .finally(() => {
                    closeWrapLoading();
                    closeDrawer();
                    emit('success', {
                      action: 'reload',
                      key: '',
                    });
                  });
              }
            } else {
              const parentGroup = values.parentGroup;
              if (parentGroup && parentGroup != '') {
                createOrAddChildGroup(parentGroup, values.childGroup)
                  .then(() => {
                    createMessage.success(t('common.saveSuccess'));
                  })
                  .catch(() => {
                    createErrorModal({
                      title: t('sys.api.errorTip'),
                      content: t('account.addChildGroupErr'),
                    });
                  })
                  .finally(() => {
                    closeWrapLoading();
                    closeDrawer();
                    emit('success', {
                      action: 'reload',
                      key: parentGroup,
                    });
                  });
              }
            }
          }
        } finally {
          setDrawerProps({ confirmLoading: false });
          closeWrapLoading();
        }
      }

      return {
        t,
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        formEl,
      };
    },
  });
</script>
