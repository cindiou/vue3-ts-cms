<template>
  <div class="dio-form">
    <slot name="header"></slot>
    <el-form :="form.formProps">
      <template v-for="(row, index) in form.rows" :key="index">
        <el-row
          v-bind="{
            ...form.commonRowProps,
            ...row.curRowProps,
          }"
        >
          <template v-if="!row.inOneCol">
            <template
              v-for="(item, indey) in row.cols"
              :key="index + '-' + indey"
            >
              <el-col
                v-bind="{
                  ...form.commonColProps,
                  ...item.itemColProps,
                }"
              >
                <template v-if="item.itemFormProps">
                  <el-form-item :="item.itemFormProps">
                    <component
                      :is="item.itemProps.is"
                      :="item.itemProps.props"
                      v-model="formData[`${item?.itemProps?.field}`]"
                    >
                      <!--$$$ 组件内部填充  -->
                      <template v-if="item.itemProps?.children?.sort">
                        <template
                          v-for="(child, indez) in item?.itemProps?.children"
                          :key="index + '_' + indey + '_' + indez"
                        >
                          <template v-if="child?.itemProps?.is">
                            <component
                              :is="child.itemProps.is"
                              :="child.itemProps.props"
                            ></component>
                          </template>
                        </template>
                      </template>
                    </component>
                  </el-form-item>
                </template>
              </el-col>
            </template>
          </template>
          <template v-else>
            <!-- 该行中的所有组件共在同一列 -->
            <el-col
              v-bind="{
                ...form.commonColProps,
                ...row.cols?.[0]?.itemColProps,
              }"
            >
              <template
                v-for="(item, indey) in row.cols"
                :key="index + '-' + indey"
              >
                <!-- @="item.itemEvents" -->
                <component
                  :is="item.itemProps.is"
                  :="item.itemProps.props"
                  v-model="formData[`${item?.itemProps?.field}`]"
                >
                  <!--$$$ 组件内部填充  -->
                  <template v-if="item.itemProps?.children?.sort">
                    <template
                      v-for="(child, indez) in item.itemProps.children"
                      :key="index + '_' + indey + '_' + indez"
                    >
                      <!-- @="child.itemEvents" -->
                      <component
                        :is="child.itemProps.is"
                        :="child.itemProps.props"
                        v-model="formData[`${child?.itemProps?.field}`]"
                      >
                        <slot
                          :name="index + '_' + indey + '_' + indez"
                          :props="child.itemProps"
                        ></slot>
                      </component>
                    </template>
                  </template>
                  <template v-else-if="item.itemProps?.children?.slice">
                    {{ item.itemProps.children }}
                  </template>
                  <template v-else>
                    <slot
                      :name="index + '_' + indey"
                      :props="item.itemProps"
                    ></slot>
                  </template>
                  <!--$$$ 组件内部填充  -->
                </component>
              </template>
            </el-col>
          </template>
        </el-row>
      </template>
    </el-form>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, PropType,ref,watch } from "vue";
import type { IForm } from "../types";


export default defineComponent({
  props: {
    form: {
      type: Object as PropType<IForm>,
      required:true,
      default: () => ({}),
    },
    modelValue:{
      type:Object,
      required:true,
      default:()=>({})
    }
  },
  emits:["update:modelValue"],
  setup(props,{emit}) {
    
    const formData = ref({...props.modelValue});
    // console.log("formData ",formData );
    
    watch(formData,(newValue)=>{
      emit("update:modelValue",newValue);
    },{
      deep:true
    })
    return {formData};
  },
});
</script>

<style scoped lang="scss">
.dio-form{
  padding:20px;
}
</style>
