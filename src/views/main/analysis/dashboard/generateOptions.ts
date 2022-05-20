import type { EChartsOption } from "echarts";
import * as echarts from "echarts";
import { convertData } from "./utils/convert-data";

export const generatePieOptions = function (data: any[]): EChartsOption {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "horizontal",
      left: "left",
    },
    series: [
      {
        name: "分类数据",
        type: "pie",
        radius: "50%",
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0,0,0,0.5)",
          },
        },
      },
    ],
  };
};

export const generateRoseOptions = function (data: any): EChartsOption {
  return {
    legend: {
      top: "top",
    },
    toolbox: {
      show: true,
      /* feature: {
        mark: {show: true},
        dataView: {show: true, readOnly: false},
        restore: {show: true},
        saveAsImage: {show: true}
    } */
    },
    series: [
      {
        name: "分类数据",
        type: "pie",
        radius: [20, 120],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data,
      },
    ],
  };
};

export const generateBrokenLineOptions = function (
  xKeys: any[],
  xValues: any[],
): EChartsOption {
  return {
    title: {
      text: "堆叠区域图",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: xKeys,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "分类销量",
        type: "line",
        stack: "总量",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: xValues,
      },
    ],
  };
};

export const generateBarOptions = function (
  xKeys: any,
  xValues: any,
): echarts.EChartsCoreOption {
  return {
    xAxis: {
      data: xKeys,
      axisLabel: {
        inside: true,
        textStyle: {
          color: "#fff",
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: "#999",
        },
      },
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
        data: xValues,
      },
    ],
  };
};

export const generateMapOptions = (data: any): EChartsOption => {
  const d = convertData(data);

  return {
    backgroundColor: "#fff",
    title: {
      text: "全国销量统计",
      left: "center",
      textStyle: {
        color: "#fff",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        return params.name + " : " + params.value[2];
      },
    },
    visualMap: {
      min: 0,
      max: 60000,
      left: 20,
      bottom: 20,
      calculable: true,
      text: ["高", "低"],
      inRange: {
        color: ["rgb(70, 240, 252)", "rgb(250, 220, 46)", "rgb(245, 38, 186)"],
      },
      textStyle: {
        color: "#fff",
      },
    },
    geo: {
      map: "china",
      roam: "scale",
      itemStyle: {
        borderColor: "rgb(9, 54, 95)",
        areaColor: "#f4cccc",
      },
      // emphasis: {
      // areaColor: "#f4cccc",
      // },
    },
    series: [
      {
        name: "销量",
        type: "scatter",
        coordinateSystem: "geo",
        data: d,
        symbolSize: 12,
        emphasis: {
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 1,
          },
        },
      },
      {
        type: "map",
        map: "china",
        geoIndex: 0,
        aspectScale: 0.75,
        tooltip: {
          show: false,
        },
      },
    ],
  };
};
