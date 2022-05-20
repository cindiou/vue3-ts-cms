import { ref } from "vue";
import { PageModal } from "@/base-ui/page-modal";

type cb = (info?: any) => any;

export default function (newCb?: cb, editCb?: cb) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>();
  const defaultFormData = ref<any>({});

  const handleNewData = () => {
    defaultFormData.value = {};
    if (pageModalRef.value) {
      pageModalRef.value.visible = true;
      pageModalRef.value.title = `新建${pageModalRef.value.title.slice(2)}`;
    }

    newCb && newCb();
  };
  const handleEditData = (info: any) => {
    // console.log("handleEditData", info);
    defaultFormData.value = { ...info }; //保存数据，准备合并
    if (pageModalRef.value) {
      pageModalRef.value.visible = true;
      pageModalRef.value.title = `编辑${pageModalRef.value.title.slice(2)}`;
    }

    editCb && editCb(info);
  };

  return [pageModalRef, handleNewData, handleEditData, defaultFormData];
}
