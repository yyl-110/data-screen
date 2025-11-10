<template>
  <div style="width: 56%; height: 100%">
    <v-chart :option="chartOption" class="chart" />
  </div>
</template>

<script setup>
import * as echarts from "echarts";
const chartOption = ref({});

const props = defineProps({
  chartData: {
    type: Array,
    default: () => [],
  },
});

const initChart = () => {
  chartOption.value = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        label: {
          show: true,
        },
      },
    },
    grid: {
      left: "10%",
      top: "15%",
      right: "5%",
      bottom: "20%",
    },
    xAxis: {
      data: props.chartData.map((item) => item.projectName),
      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: "#163a5f",
          width: 2,
        },
      },
      axisTick: {
        show: false, //隐藏X轴刻度
        alignWithLabel: true,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#ffffff", //X轴文字颜色
          fontSize: 16,
        },
        interval: 0,
        rotate: 45, // 文字倾斜角度(可选45、90等)
        formatter: function (value) {
          // 如果文字过长可以截取
          return value.length > 6 ? value.substring(0, 6) + "..." : value;
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "",
        nameTextStyle: {
          color: "#ffffff",
          fontSize: 16,
        },
        splitLine: {
          show: false,
          lineStyle: {
            width: 1,
            color: "#CED2DB",
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true, //隐藏X轴轴线
          lineStyle: {
            color: "#163a5f",
            width: 2,
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#ffffff",
            fontSize: 16,
          },
        },
      },
      {
        type: "value",
        name: "",
        nameTextStyle: {
          color: "#ffffff",
          fontSize: 16,
        },
        splitLine: {
          show: false,
          lineStyle: {
            width: 1,
            color: "#CED2DB",
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false, //隐藏X轴轴线
          lineStyle: {
            color: "#163a5f",
            width: 2,
          },
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: "#797A7F",
            fontSize: 14,
          },
        },
      },
    ],
    series: [
      {
        name: "项目数",
        type: "bar",
        barWidth: 32,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(36,226,226, 0.3)',
          borderRadius: [10, 10, 0, 0]
        },
        itemStyle: {
          color: "#24E2E2",
          barBorderRadius: [10, 10, 0, 0],
        },
        data: props.chartData.map((item) => item.completeNums),
      }
    ],
  };
};

watch(
  () => props.chartData,
  () => {
    console.log('props.chartData:', props.chartData)
    initChart();
  }, { deep: true }
);
</script>

<style lang="scss" scoped></style>