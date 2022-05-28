import "element-plus/lib/theme-chalk/base.css"; //导入基本的样式，比如：按钮的圆角
import type { App } from "vue";
import {
  ElButton,
  ElTabPane,
  ElTabs,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElAside,
  ElContainer,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubmenu,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElAvatar,
  ElRow,
  ElCol,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDatePicker,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElPopconfirm,
  ElDialog,
  ElPopover,
  ElSelect,
  ElOption,
  ElScrollbar,
  ElCard,
  ElDescriptions,
  ElDescriptionsItem,
} from "element-plus"; //导入需要用到组件，在全局注册

export const Components = [
  ElButton,
  ElTabPane,
  ElTabs,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElAside,
  ElContainer,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubmenu,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElAvatar,
  ElRow,
  ElCol,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDatePicker,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElPopconfirm,
  ElDialog,
  ElPopover,
  ElSelect,
  ElOption,
  ElScrollbar,
  ElCard,
  ElDescriptions,
  ElDescriptionsItem,
];

export default function (app: App): void {
  for (const component of Components) {
    app.component(component.name, component);
  }
}

export type UnionNeedType =
  | {
      is: "ElButton";
      field?: string;
      props?: InstanceType<typeof ElButton>["$props"];
    }
  | {
      is: "ElInput";
      field?: string;
      props?: InstanceType<typeof ElInput>["$props"] & {
        autofocus?: boolean;
      };
    }
  | {
      is: "ElCheckbox";
      field?: string;
      props?: InstanceType<typeof ElCheckbox>["$props"];
    }
  | {
      is: "ElDatePicker";
      field?: string;
      props?: InstanceType<typeof ElDatePicker>["$props"];
    }
  | {
      is: "ElSelect";
      field?: string;
      props?: InstanceType<typeof ElSelect>["$props"];
    }
  | {
      is: "ElOption";
      field?: string;
      props?: InstanceType<typeof ElOption>["$props"];
    };
/* type t = InstanceType<typeof ElButton>["$props"] & {
  autofocus?: boolean;
};
const T:t={
  autofocus:true,
} */
