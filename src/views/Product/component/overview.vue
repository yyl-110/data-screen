<template>
  <div style="width: 86%; height: 100%">
    <v-chart :option="chartOption" class="chart" />
  </div>
</template>

<script setup>
import * as echarts from "echarts";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const chartOption = ref({});
const initChart = () => {
  console.log("props.data", props.data.map((item) => item.nodeName));
  let chartData = {
    color: "0,205,151",
    yAxisData: props.data.map((item) => item.nodeName),
    data: props.data.map((item) => item.countNums),
    totalData: props.data.map((item) => item.sumNum),
  };

  chartOption.value = {
    grid: {
      top: 0,
      left: 0,
      right: "5%",
      bottom: 0,
      containLabel: true,
    },
    xAxis: [
      {
        show: false,
        type: "value",
        splitLine: {
          show: false,
          lineStyle: {
            color: "#11456F",
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#0B5EA0",
          },
        },
        axisLabel: {
          margin: 0,
          textStyle: {
            color: "rgb(183,227,252)",
          },
        },
      },
    ],
    yAxis: [
      {
        type: "category",
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          margin: 20,
          textStyle: {
            color: "#fff",
          },
        },
        inverse: true,
        data: chartData.yAxisData,
      },
    ],
    tooltip: {
      show: false,
    },
    series: [
      {
        name: "",
        type: "bar",
        zlevel: 2,
        barWidth: 20,
        label: {
          show: true,
          color: "#fff",
          fontSize: 16,
          formatter: (params) => {
            // 展示 count/total 格式
            const index = params.dataIndex;
            return `${chartData.data[index]}/${chartData.totalData[index]}`;
          },
        },
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "#2663DA",
              },
              {
                offset: 1,
                color: "#69CCF6",
              },
            ],
          },
        },
        data: chartData.data,
      },
    ],
  };
};

watch(
  () => props.data,
  () => {
    initChart();
  }
);
</script>

<style lang="scss" scoped></style>