import { computed, ref, nextTick } from "vue";
import { useStore } from "@/store";

import { ElTree } from "element-plus";

import type { IForm } from "@/base-ui/form";
import { mapRoleListToLeafKeys } from "@/utils/useMenusMapper";

//双向绑定，获取searchForm中用户输入的数据
const formData = {
  name: "",
  intro: "",
};

const searchForm: IForm = {
  formProps: {
    labelWidth: "40px",
  },
  commonRowProps: {},
  commonColProps: {
    span: 24,
  },
  rows: [
    {
      curRowProps: {},
      cols: [
        {
          itemFormProps: {
            label: "角色",
          },
          itemProps: {
            is: "ElInput",
            field: "name",
            props: {
              size: "mini",
              placeholder: "请输入角色名~",
              autofocus: true,
            },
          },
        },
        {
          itemFormProps: {
            label: "介绍",
          },
          itemProps: {
            is: "ElInput",
            field: "intro",
            props: {
              size: "mini",
              placeholder: "请输入角色介绍~",
            },
          },
        },
      ],
    },
  ],
};

const modalConfig = {
  title: "新建角色",
  formData: searchForm,
  modelFormFields: formData,
  //switchFields: ["password"], //处于编辑界面时，将会隐藏 该字段所对应的表单项
};

export function useModal() {
  const store = useStore();
  //角色可选的权限
  const menuList = computed(() => store.state.entireMenu);

  const modalConfigRef = computed(() => {
    return modalConfig;
  });

  const otherRequestQuery = ref({});
  const handleCheckChange = (origin: any, checkInfo: any) => {
    const { halfCheckedKeys, checkedKeys } = checkInfo;
    const menuList = [...checkedKeys, ...halfCheckedKeys];
    otherRequestQuery.value = {
      menuList,
    };
  };

  const elTreeRef = ref<InstanceType<typeof ElTree>>();
  /* eslint-disable-next-line */
  const newCallBack = () => {};
  const editCallBack = (info: any) => {
    // console.log("editCallBack", info.menuList);
    const leafKeys = mapRoleListToLeafKeys(info.menuList);
    nextTick(() => {
      elTreeRef.value?.setCheckedKeys(leafKeys, false);
    });
  };

  return {
    modalConfigRef,
    menuList,
    handleCheckChange,
    otherRequestQuery,
    newCallBack,
    editCallBack,
    elTreeRef,
  };
}
