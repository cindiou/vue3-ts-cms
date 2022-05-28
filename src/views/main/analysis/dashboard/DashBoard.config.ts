import { useStore } from "@/store";
import { computed } from "vue";

import {
  generatePieOptions,
  generateRoseOptions,
  generateBrokenLineOptions,
  generateBarOptions,
  generateMapOptions,
} from "./generateOptions";

export function useDashBoard() {
  /* 请求所有Echarts图表需用到的数据 */
  const store = useStore();
  store.dispatch("analysis/getDashBoardAction");

  const topPanelData = computed(() => {
    const res = store.state.analysis.topPanelDatas;
    // console.log("res=", res && res.data);
    return res && res.data;
  });
  const goodsSaleTop10 = computed(() => {
    return store.state.analysis.goodsSaleTop10.map((item: any) => {
      return { value: item.saleCount, name: item.name };
    });
  });

  // =====================

  const PieOptions = computed(() => {
    const goodsCount = store.state.analysis.categoryGoodsCount.map(
      (item: any) => {
        return {
          name: item.name,
          value: item.goodsCount,
        };
      },
    );
    return generatePieOptions(goodsCount);
  }); //取出computed计算出的值

  const RoseOptions = computed(() => {
    const goodsCount = store.state.analysis.categoryGoodsCount.map(
      (item: any) => {
        return {
          name: item.name,
          value: item.goodsCount,
        };
      },
    );
    return generateRoseOptions(goodsCount);
  });

  const BrokenLineOptions = computed(() => {
    const xKeys: any[] = [];
    const xValues: any[] = [];
    const goodsSale = store.state.analysis.categoryGoodsSale;
    for (const sale of goodsSale) {
      xKeys.push(sale.name);
      xValues.push(sale.goodsCount);
    }

    return generateBrokenLineOptions(xKeys, xValues);
  });

  const BarOptions = computed(() => {
    const xKeys: any[] = [];
    const xValues: any[] = [];
    const goodsSale = store.state.analysis.categoryGoodsSale;
    for (const sale of goodsSale) {
      xKeys.push(sale.name);
      xValues.push(sale.goodsCount);
    }

    return generateBarOptions(xKeys, xValues);
  });

  const MapOptions = computed(() => {
    const citySale = store.state.analysis.addressGoodsSale.map((item) => {
      return {
        name: item.address,
        value: item.count,
      };
    });

    return generateMapOptions(citySale);
  });

  return {
    PieOptions,
    RoseOptions,
    BrokenLineOptions,
    BarOptions,
    MapOptions,

    topPanelData,
    goodsSaleTop10,
  };
}
