import { computed } from "vue";
import { useStore } from "@/store";

import type { IForm } from "@/base-ui/form";
// import { ref } from "vue";

//双向绑定，获取searchForm中用户输入的数据
const formData = {
  name: "",
  realname: "",
  password: "",
  cellphone: "",
  roleId: "",
  departmentId: "",
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
            label: "用户名",
          },
          itemProps: {
            is: "ElInput",
            field: "name",
            props: {
              size: "mini",
              placeholder: "请输入用户名~",
            },
          },
        },
        {
          itemFormProps: {
            label: "真实姓名",
          },
          itemProps: {
            is: "ElInput",
            field: "realname",
            props: {
              size: "mini",
              placeholder: "请输入用户真实姓名",
            },
          },
        },
        {
          itemFormProps: {
            label: "密码",
          },
          itemProps: {
            is: "ElInput",
            field: "password",
            props: {
              size: "mini",
              placeholder: "请输入用户密码~",
              showPassword: true,
            },
          },
        },
        {
          itemFormProps: {
            label: "电话号码",
          },
          itemProps: {
            is: "ElInput",
            field: "cellphone",
            props: {
              size: "mini",
              placeholder: "请输入用户手机号码~",
            },
          },
        },
        {
          itemFormProps: {
            label: "角色",
          },
          itemProps: {
            is: "ElSelect",
            field: "roleId",
            props: {
              size: "mini",
              placeholder: "请选择角色~",
            },
            children: [],
          },
        },
        {
          itemFormProps: {
            label: "部门",
          },
          itemProps: {
            is: "ElSelect",
            field: "departmentId",
            props: {
              size: "mini",
              placeholder: "请选择部门~",
            },
            children: [],
          },
        },
      ],
    },
  ],
};

const modalConfig = {
  title: "新建用户",
  formData: searchForm,
  modelFormFields: formData,
  switchFields: ["password"], //处于编辑界面时，将会隐藏 该字段所对应的表单项
};

export function useListerner() {
  const store = useStore();
  const modalConfigRef = computed(() => {
    modalConfig.formData.rows.forEach((row) => {
      row.cols.forEach((col) => {
        if (col?.itemProps?.field === "roleId") {
          col!.itemProps!.children = store.state.entireRole.map((item) => {
            return {
              itemProps: {
                is: "ElOption",
                props: {
                  label: item.name,
                  value: item.id,
                },
              },
            };
          });
        }
        if (col?.itemProps?.field === "departmentId") {
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
