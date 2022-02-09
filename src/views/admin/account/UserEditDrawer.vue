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
  import { ChangePasswordParams, GetUserInfoResult } from '/@/api/admin/model/account';
  import { useLoading } from '/@/components/Loading';
  import { difference } from 'lodash-es';

  export default defineComponent({
    name: 'UserEditDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const drawerEl = ref(null);
      let key = '';
      let oGroups: string[] = [];

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
        key = '';
        oGroups = [];
        resetFields();
        setDrawerProps({ confirmLoading: false });

        key = data.record.key;
        openWrapLoading();
        getUserInfo(key, {
          groups: true,
        })
          .then((res: GetUserInfoResult) => {
            const userInfo: GetUserInfoResult = reactive(res);
            const groups = data.record.groups;
            for (var i = 0; i < groups.length; i++) {
              oGroups.push(groups[i].id);
            }
            let quota = userInfo.quota;
            let newQuota = '';
            if (quota != -1) {
              newQuota = (quota / 1024 / 1024 / 1024).toFixed(2);
            }
            setFieldsValue({
              ...userInfo,
              groups: oGroups,
              quota: newQuota,
              disableAccount: userInfo.enabled ? false : true,
            });
          })
          .finally(() => {
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
          const nGroups = values.groups;
          const addGroups = difference(nGroups, oGroups);
          const removeGroups = difference(oGroups, nGroups);
          values.addGroups = addGroups;
          values.removeGroups = removeGroups;
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
