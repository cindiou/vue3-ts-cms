import { computed } from "vue";
import { useStore } from "@/store";

import type { IForm } from "@/base-ui/form";
// import { ref } from "vue";

//双向绑定，获取searchForm中用户输入的数据
const formData = {
  name: "",
  leader: "",
  parentId: "",
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
            label: "部门名称",
          },
          itemProps: {
            is: "ElInput",
            field: "name",
            props: {
              size: "mini",
              placeholder: "请输入部门名称~",
            },
          },
        },
        {
          itemFormProps: {
            label: "领导名称",
          },
          itemProps: {
            is: "ElInput",
            field: "leader",
            props: {
              size: "mini",
              placeholder: "请输入领导名称~",
            },
          },
        },
        {
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
        },
      ],
    },
  ],
};

const modalConfig = {
  title: "新建部门",
  formData: searchForm,
  modelFormFields: formData,
  // switchFields: [""], //处于编辑界面时，将会隐藏 该字段所对应的表单项
};

export function useListerner() {
  const store = useStore();
  const modalConfigRef = computed(() => {
    modalConfig.formData.rows.forEach((row) => {
      row.cols.forEach((col) => {
        if (col?.itemProps?.field === "parentId") {
          col!.itemProps!.children = store.state.entireDepartment.map(
            (item) => {
              return {
                itemProps: {
                  is: "ElOption",
                  props: {
                    label: item.name,
                    value: item.id,
                  },
                },
              };
            },
          );
        }
      });
    });

    return modalConfig;
  });

  return modalConfigRef;
}
