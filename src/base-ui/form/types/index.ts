import type { ElForm, ElFormItem, ElRow, ElCol } from "element-plus";
import type { UnionNeedType } from "@/plugins/register-elementPlus";

export interface IFormItem {
  itemColProps?: InstanceType<typeof ElCol>["$props"];
  itemFormProps?: InstanceType<typeof ElFormItem>;
  itemProps?: UnionNeedType & { children?: any };
  itemEvents?: any;
}

export interface IFormRow {
  curRowProps?: InstanceType<typeof ElRow>;
  cols: IFormItem[];
  inOneCol?: boolean;
}

export interface IForm {
  formProps?: InstanceType<typeof ElForm>["$props"];
  commonRowProps?: InstanceType<typeof ElRow>;
  commonColProps?: InstanceType<typeof ElCol>["$props"];
  rows: IFormRow[];
}
