<template>
  <div style="width: 100%; height: 100%">
    <v-chart :option="chartOption" class="chart" />
  </div>
</template>

<script setup>
import * as echarts from "echarts";

const props = defineProps({
  data: {
    type: Object,
    default: () => { },
  },
});

const chartOption = ref({});
const initChart = () => {
  let max = props.data.totalCount;
  let value = props.data.archivedCount;

  const rate = max ? ((value * 100) / max).toFixed(1) : 0;
  chartOption.value = {
    title: [
      {
        text: `{b|${value}/${max}}\n{a|${rate}%}`,
        show: true,
        x: "center",
        y: "center",
        textStyle: {
          rich: {
            a: {
              fontSize: 18,
              padding: [5, 0, 0, 0],
              color: "#BACDF5",
            },
            b: {
              fontSize: 22,
              color: "#FFFFFF",
            },
          },
        },
      },
    ],
    polar: {
      center: ["50%", "50%"],
      radius: ["60%", "100%"],
    },
    angleAxis: {
      max: max,
      show: false,
    },
    radiusAxis: {
      type: "category",
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: "",
        type: "bar",
        roundCap: true,
        showBackground: true,
        backgroundStyle: {
          color: "rgba(12, 28, 70, .5)",
        },
        data: [value],
        coordinateSystem: "polar",
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: "#0C98EB",
              },
              {
                offset: 1,
                color: "#00E5E3",
              },
            ]),
          },
        },
      },
    ],
  };
};
watch(
  () => props.data,
  () => {
    initChart();
  },
  { immediate: true, deep: true }
);
</script>

<style lang="scss" scoped></style>