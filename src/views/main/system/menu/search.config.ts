import type { IForm } from "@/base-ui/form";
import { ref } from "vue";

//双向绑定，获取searchForm中用户输入的数据
const formData = ref({
  id: "",
  name: "",
  oldPrice: "",
  newPrice: "",
  status: "",
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
          itemColProps: {},
          itemFormProps: {
            label: "id",
          },
          itemProps: {
            is: "ElInput",
            field: "id",
            props: {
              size: "mini",
              placeholder: "请输入商品ID~",
            },
          },
          itemEvents: {},
        },
        {
          itemFormProps: {
            label: "商品名称",
          },
          itemProps: {
            is: "ElInput",
            field: "name",
            props: {
              size: "mini",
              placeholder: "请输入商品名称~",
            },
          },
        },
        {
          itemFormProps: {
            label: "原价格",
          },
          itemProps: {
            is: "ElInput",
            field: "oldPrice",
            props: {
              size: "mini",
              placeholder: "请输入商品原价~",
            },
          },
        },
        {
          itemFormProps: {
            label: "现价",
          },
          itemProps: {
            is: "ElInput",
            field: "newPrice",
            props: {
              size: "mini",
              placeholder: "请输入商品现价~",
            },
          },
        },
        {
          itemFormProps: {
            label: "状态",
          },
          itemProps: {
            is: "ElInput",
            field: "status",
            props: {
              size: "mini",
              placeholder: "请输入商品状态~",
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
    /* {
      curRowProps: {
        justify: "end",
      },
      inOneCol: true,
      cols: [
        {
          itemProps: {
            is: "ElButton",
            props: {
              type: "info",
              size: "small",
              icon: "el-icon-refresh",
            },
            children: "重置",
          },
        },
        {
          itemProps: {
            is: "ElButton",
            props: {
              type: "primary",
              size: "small",
              icon: "el-icon-search",
            },
            children: "查询",
          },
        },
      ],
    }, */
  ],
};

export { formData as modelFormFields, searchForm as formData };
