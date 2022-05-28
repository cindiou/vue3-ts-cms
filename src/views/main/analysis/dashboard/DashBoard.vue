<template>
  <div class="dashboard">
    <!-- 顶部动态数据 -->
    <el-row :gutter="10">
      <template v-for="item in topPanelData" :key="item.title">
        <el-col :md="12" :lg="6" :xl="6">
          <statistical-panel :panelData="item" />
        </el-col>
      </template>
    </el-row>

    <!-- 中间echarts图 -->
    <div class="dashboard-main">
      <el-row :gutter="10">
        <el-col :span="7">
          <el-card>
            <template #header>
              <div class="text">分类商品数量（饼图）</div>
            </template>
            <base-echarts :options="PieOptions" />
          </el-card>
        </el-col>
        <el-col :span="10">
          <el-card>
            <template #header>
              <div class="text">不同城市商品销量</div>
            </template>
            <base-echarts :options="MapOptions" />
          </el-card>
        </el-col>
        <el-col :span="7">
          <el-card>
            <template #header>
              <div class="text">分类商品数量（玫瑰图）</div>
            </template>
            <base-echarts :options="RoseOptions" />
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 下面echarts图 -->
    <div class="dashboard-footer">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-card header="分类商品的销量">
            <template #header>
              <div class="text">分类商品的销量</div>
            </template>
            <base-echarts :options="BrokenLineOptions" />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card header="分类商品的收藏">
            <template #header>
              <div class="text">分类商品的收藏</div>
            </template>
            <base-echarts :options="BarOptions" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useDashBoard } from "./DashBoard.config";

import { BaseEcharts } from "@/base-ui/base-echarts";
import StatisticalPanel from "@/components/statistical-panel";

export default defineComponent({
  name: "dashboard",
  components: {
    BaseEcharts,
    StatisticalPanel,
  },
  setup() {
    const {
      PieOptions,
      RoseOptions,
      BrokenLineOptions,
      BarOptions,
      MapOptions,

      topPanelData,
      goodsSaleTop10,
    } = useDashBoard();

    return {
      PieOptions,
      RoseOptions,
      BrokenLineOptions,
      BarOptions,
      MapOptions,

      topPanelData,
      goodsSaleTop10,
    };
  },
});
</script>
<style scoped lang="scss">
.dashboard {
  .dashboard-header {
    margin-bottom: 10px;
  }

  .dashboard-main {
    margin-bottom: 10px;
  }

  .text {
    text-align: left;
  }
}
</style>
