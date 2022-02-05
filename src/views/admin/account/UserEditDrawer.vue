<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="t('account.editUser')"
    width="600px"
    :maskClosable="false"
    @ok="handleSubmit"
  >
    <div ref="drawerEl">
      <BasicForm @register="registerForm" />
    </div>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { userEditFormSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { getUserInfo, updateUser, changePassword } from '/@/api/admin/account';
  import { ChangePasswordParams } from '/@/api/admin/model/account';
  import { useLoading } from '/@/components/Loading';

  export default defineComponent({
    name: 'UserEditDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const drawerEl = ref(null);
      let key = '';

      const [openWrapLoading, closeWrapLoading] = useLoading({
        target: drawerEl,
        props: {
          tip: t('common.readingText'),
          absolute: true,
        },
      });

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: userEditFormSchema,
        showActionButtonGroup: false,
        autoFocusFirstItem: true,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });

        key = data.record.key;
        openWrapLoading();
        getUserInfo(key, {
          groups: true,
        }).then((res) => {
          const userInfo = reactive(res);
          const groups = userInfo.groups;
          let newGroups: string[] = [];
          for (var i = 0; i < groups.length; i++) {
            newGroups.push(groups[i].displayName);
          }
          let quota = userInfo.quota;
          if (quota == -1) {
            quota = '';
          } else {
            quota = (quota / 1024 / 1024 / 1024).toFixed(2);
          }
          setFieldsValue({
            ...userInfo,
            groups: newGroups,
            quota,
            disableAccount: userInfo.enabled ? false : true,
          });
          closeWrapLoading();
        });
      });

      async function handleSubmit() {
        try {
          let values = await validate();
          if (values.quota && values.quota > 0) {
            values.quota = values.quota * 1024 * 1024 * 1024;
          } else {
            values.quota = -1;
          }
          setDrawerProps({ confirmLoading: true });
          updateUser(key, values).then(() => {
            if (values.password && values.password != '') {
              const params: ChangePasswordParams = {
                newpw: values.password,
              };
              changePassword(key, params);
            }
            createMessage.success(t('common.saveSuccess'));
            closeDrawer();
            emit('success');
          });
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        t,
        registerDrawer,
        registerForm,
        handleSubmit,
        drawerEl,
      };
    },
  });
</script>
