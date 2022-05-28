import { computed } from "vue";

import type { IForm } from "@/base-ui/form";
// import { ref } from "vue";

//双向绑定，获取searchForm中用户输入的数据
const formData = {
  name: "",
};

const searchForm: IForm = {
  formProps: {
    labelWidth: "90px",
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
            label: "类别名称",
          },
          itemProps: {
            is: "ElInput",
            field: "name",
            props: {
              size: "mini",
              placeholder: "请输入类别名称~",
            },
          },
        },
        /* {
          itemFormProps: {
            label: "上级部门",
          },
          itemProps: {
            is: "ElSelect",
            field: "parentId",
            props: {
              size: "mini",
              placeholder: "请输入上级部门~",
            },
            children: [],
          },
        }, */
      ],
    },
  ],
};

const modalConfig = {
  title: "新建类别",
  formData: searchForm,
  modelFormFields: formData,
  // switchFields: [""], //处于编辑界面时，将会隐藏 该字段所对应的表单项
};

export function useListerner() {
  const modalConfigRef = computed(() => modalConfig);
  return modalConfigRef;
}
