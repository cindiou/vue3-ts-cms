import type { IForm } from "@/base-ui/form";
import { ref } from "vue";

//双向绑定，获取searchForm中用户输入的数据
const formData = ref({
  name: "",
  intro: "",
  createAt: "",
});

const searchForm: IForm = {
  formProps: {
    labelWidth: "90px",
  },
  commonRowProps: {},
  commonColProps: {
    span: 8,
    xs: 24,
    xl: 6,
    lg: 8,
    md: 12,
    sm: 12,
  },
  rows: [
    {
      curRowProps: {},
      cols: [
        {
          itemFormProps: {
            label: "角色名",
          },
          itemProps: {
            is: "ElInput",
            field: "name",
            props: {
              size: "mini",
              placeholder: "请输入角色名~",
            },
          },
        },
        {
          itemFormProps: {
            label: "用户权限",
          },
          itemProps: {
            is: "ElInput",
            field: "intro",
            props: {
              size: "mini",
              placeholder: "请输入用户权限",
            },
          },
        },
        {
          itemFormProps: {
            label: "创建日期",
          },
          itemProps: {
            is: "ElDatePicker",
            field: "createAt",
            props: {
              size: "mini",
              type: "datetimerange",
              format: "YYYY-MM-DD",
              // "range-separator": "-",
              "start-placeholder": "开始日期",
              "end-placeholder": "结束日期",
              style: "width:100%", //border:1px solid red;
            },
          },
        },
      ],
    },
  ],
};

export { formData as modelFormFields, searchForm as formData };
