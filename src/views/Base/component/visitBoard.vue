<template>
  <div style="width: 100%; height: 100%">
    <v-chart :option="chartOption" class="chart" ref="myChart" />
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import rank from "../../../assets/module/rank.png";
import lightPoint from "@/assets/common/lightPoint.png";
const chartOption = ref({});
const myChart = ref(null);

const props = defineProps({
  chartData: {
    type: Array,
    default: () => [],
  },
});

const initChart = () => {
  const dataList = props.chartData.map((item) => ({
    name: item.groupName,
    value: item["count(*)"],
  }));

  let dataBg = dataList.map((item) => ({
    value: 1,
    name: item.name,
    barValue: item.value,
  }));

  chartOption.value = {
    grid: {
      left: 10,
      top: 8,
      bottom: 8,
      right: 10,
      containLabel: true,
    },
    tooltip: {
      trigger: "item",
      formatter(params) {
        let res = "";
        const { marker, name, value } = params;
        if (name !== "") {
          res += `${marker}${name} : ${value}`;
        }
        return res;
      },
    },
    xAxis: [
      {
        type: "value",
        show: false,
      },
      {
        type: "value",
        show: false,
      },
    ],
    yAxis: [
      {
        type: "category",
        inverse: true,
        axisLabel: {
          margin: 30,
          align: "center",
          textStyle: {
            rich: {
              bg: {
                color: "#fff",
                fontSize: 23,
                lineHeight: 33,
                backgroundColor: {
                  image: rank,
                },
                height: 33,
                width: 30,
               padding: [4, 0, 0, 0],
              },
            },
          },
          formatter: function (value, index) {
            return "{bg|" + (index + 1) + "}";
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        data: dataList.map((item) => item.name),
      },
      {
        inverse: true,
        axisTick: "none",
        axisLine: "none",
        show: true,
        axisLabel: {
          color: "rgba(96, 98, 102, 1)",
          fontSize: 20,
          rich: {
            a: {
              width: 80,
              fontSize: 20,
              color: "#00F3FD",
              padding: [0, 10, 0, 0],
            },
            b: {
              fontSize: 16,
              color: "#fff",
            },
          },
          formatter: function (value, index) {
            const { name } = dataList[index];
            return `{a|${value}人}{b|${name}}`;
          },
        },
        data: dataList,
      },
    ],
    series: [
      {
        name: "进度部分",
        type: "bar",
        zlevel: 1,
        showBackground: true,
        backgroundStyle: {
          color: "#0B2233",
          borderRadius: 8,
        },
        itemStyle: {
          borderRadius: 8,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "rgba(1,192,247,0)",
              },
              {
                offset: 1,
                color: "#00F6FF",
              },
            ],
          },
        },
        barWidth: 6,
        data: dataList,
      },
      // 进度条的小圆圈
      {
        name: "小圈圈",
        type: "scatter",
        symbol: "image://" + lightPoint,
        symbolSize: 40,
        emphasis: {
          scale: false,
        },
        z: 2,
        zlevel: 10,
        data: dataList,
        animationDelay: 500,
      },
    ],
  };
};

onMounted(() => {
  if (myChart.value) {
    initChart();
  }
});

watch(
  () => props.chartData,
  () => {
    initChart();
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>