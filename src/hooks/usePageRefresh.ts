import { ref } from "vue";
import { DioTableFurther } from "@/base-ui/table";

export default function () {
  const tableRef = ref<InstanceType<typeof DioTableFurther>>();

  const handleResetEmit = () => {
    tableRef.value?.getPageData();
  };

  const handleSearchEmit = (query: any) => {
    tableRef.value?.getPageData(query, true);
  };

  return [tableRef, handleResetEmit, handleSearchEmit];
}
