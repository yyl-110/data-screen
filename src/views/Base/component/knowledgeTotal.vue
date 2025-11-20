<template>
  <div style="width: 100%; height: 100%">
    <v-chart :option="chartOption" class="chart" />
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref } from "vue";

const props = defineProps({
  chartData: {
    type: Object,
    default: () => {},
  },
});

const chartOption = ref({});

const initChart = () => {
  const legendData = props.chartData.pieChartTitle;
  const nameList = ["加改方案", "模板文件", "设计指南", "故障案例"];
  const dataList = [
    props.chartData?.pieChartValue1,
    props.chartData?.pieChartValue2,
    props.chartData?.pieChartValue3,
    props.chartData?.pieChartValue4,
  ];
  const centerArr = [
    ["25%", "25%"],
    ["75%", "25%"],
    ["25%", "75%"],
    ["75%", "75%"],
  ];

  const titleYList = ["22%", "22%", "72%", "72%"];

  const titleData = nameList.map((item, index) => {
    return {
      text: item,
      textAlign: "center",
      left: centerArr[index][0],
      top: titleYList[index],
      textStyle: {
        fontSize: 16,
        fontWeight: 600,
        color: "#331313",
      },
    };
  });

  const seriesData = dataList.map((item, index) => ({
    name: nameList[index],
    type: "pie",
    radius: ["0%", "40%"],
    center: centerArr[index], // 控制饼图1的位置
    data: item
      ? item
          .split(",")
          .map((val, inx) => ({ value: val, name: legendData[inx] }))
      : [],
    // color: ["#15EFE6", "#F7B500", "#168EF0"],
    label: {
      show: true,
      position: "inside",
      color: "#000",
      fontSize: 18,
      formatter: function (params) {
        return params.value;
      },
    },
    labelLine: {
      normal: {
        show: false,
      },
    },
  }));
  chartOption.value = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical", // 图例垂直排列
      left: "center", // 图例水平居中
      top: "25%", // 图例垂直居中
      itemWidth: 15, // 图例标识符的宽度
      itemHeight: 15, // 图例标识符的高度
      data: legendData, // 图例项
      textStyle: {
        fontSize: 12,
        color: "#fff",
      },
    },
    series: seriesData,
    title: titleData,
  };
};

watch(
  () => props.chartData,
  () => {
    initChart();
  },
  { deep: true }
);
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
