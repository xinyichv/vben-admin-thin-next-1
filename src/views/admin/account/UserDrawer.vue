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
  import { defineComponent, ref, reactive, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { userFormSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { createUser, getUserInfo } from '/@/api/admin/account';

  export default defineComponent({
    name: 'UserDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const isUpdate = ref(true);
      let key = '';

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: userFormSchema,
        showActionButtonGroup: false,
        autoFocusFirstItem: true,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        key = '';
        setDrawerProps({ confirmLoading: false });

        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          key = data.record.key;
          getUserInfo(key, {
            groups: true,
          }).then((res) => {
            const userInfo = reactive(res);
            const groups = userInfo.groups ? userInfo.groups : [];
            let newGroups: string[] = [];
            for (var i = 0; i < groups.length; i++) {
              newGroups.push(groups[i].displayName);
            }
            setFieldsValue({
              ...userInfo,
              groups: newGroups,
            });
          });
        }
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? t('account.createUser') : t('account.editUser'),
      );

      async function handleSubmit() {
        try {
          let values = await validate();
          values.key = key;
          if (values.quota && values.quota > 0) {
            values.quota = values.quota * 1024 * 1024 * 1024;
          }

          setDrawerProps({ confirmLoading: true });
          await createUser(values);
          if (unref(isUpdate)) {
            createMessage.success(t('common.saveSuccess'));
          } else {
            createMessage.success(t('common.saveSuccessWait'));
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        t,
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
