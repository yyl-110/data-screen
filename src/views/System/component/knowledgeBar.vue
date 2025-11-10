<template>
  <div style="width: 100%; height: 100%">
    <v-chart :option="chartOption" class="chart" />
  </div>
</template>

<script setup>
import * as echarts from "echarts";

const props = defineProps({
  chartData: {
    type: Array,
    default: () => [],
  },
});
const chartOption = ref({});

const initChart = () => {
  let typeList = ["数量", "近期新增"];
  let Ydata = [],
    seriesData = [];
  let type = [[], []];
  let maxCount = 0;
  props.chartData.forEach((item) => {
    Ydata.push(item.title);
    type[1].push(item.totalCount);
    type[0].push(item.recentMonthCount);
    // 更新最大值
    if (item.totalCount > maxCount) {
      maxCount = item.totalCount;
    }
  });
  // 计算所有堆叠柱之和的最大值
  const maxBgValue = Math.max(
    ...props.chartData.map((item) => item.recentMonthCount + item.totalCount)
  );

  // 背景柱数据都用这个最大值
  const maxBgArr = props.chartData.map(() => maxBgValue);

  seriesData = [
    {
      type: "bar",
      barGap: "-100%",
      barWidth: 14,
      xAxisIndex: 0,
      yAxisIndex: 1,
      z: 0,
      data: maxBgArr,
      tooltip: {
        show: false,
      },
      itemStyle: {
        normal: {
          barBorderRadius: 20,
          color: 'rgba(252,71,104,0.3)',
        },
      },
      label: {
        color: "#fff",
        position: 'right',
        offset: [-100, 28],// 向右和向下偏移10像素
        show: true,
        formatter: (params) => {
          return `${params.name}${type[1][params.dataIndex]}`;
        },
      },
    },
    {
      name: typeList[0],
      type: "bar",
      stack: "sum",
      barWidth: 14,
      itemStyle: {
        normal: {
          barBorderRadius: 20,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "#00E0DB",
              },
              {
                offset: 1,
                color: "#50EFB1",
              },
            ],
          },
        },
      },
      label: {
        position: [0, 20],
        color: "#fff",
        align: "left",
        show: true,
        formatter: (params) => {
          return `${params.name}${params.value}`;
        },
      },
      z: 1,
      data: type[1],
    },
    {
      name: typeList[1],
      type: "bar",
      stack: "sum",
      barWidth: 14,
      itemStyle: {
        normal: {
          barBorderRadius: 20,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "#F8D03F",
              },
              {
                offset: 1,
                color: "#FC4768",
              },
            ],
          },
        },
      },
      label: {
        show: false,
      },
      data: type[0],
      yAxisIndex: 1,
      z: 2,
    }
  ];

  chartOption.value = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "rgba(0, 255, 233,0)",
        },
      },
    },
    grid: {
      left: 20,
      right: 40,
      bottom: 10,
      top: 10,
      containLabel: true,
    },
    xAxis: {
      show: false,
      type: "value",
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    yAxis: [
      {
        type: "category",
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          fontSize: 16,
          color: "#fff",
        },
        data: Ydata,
      },
      {
        type: "category",
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false, // 显示右侧标签
        },
        data: Ydata,
        position: "right", // 设置位置为右侧
        yAxisIndex: 1,
      },
    ],
    series: seriesData,
  };
};

watch(() => props.chartData, initChart);
</script>

<style lang="scss" scoped></style>