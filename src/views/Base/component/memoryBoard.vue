<template>
  <div style="width: 100%; height: 100%">
    <v-chart :option="chartOption" class="chart" />
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import "echarts-liquidfill";

const chartOption = ref({});
const props = defineProps({ systemMemory: { type: String, default: "0" } });

const initChart = () => {
  function Pie() {
    let dataArr = [];
    for (var i = 0; i < 150; i++) {
      if (i % 2 === 0) {
        dataArr.push({
          name: (i + 1).toString(),
          value: 50,
          itemStyle: {
            color: "#19A4BB",
            borderWidth: 0,
            borderColor: "rgba(0,0,0,0)",
          },
        });
      } else {
        dataArr.push({
          name: (i + 1).toString(),
          value: 100,
          itemStyle: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0,
            borderColor: "rgba(0,0,0,0)",
          },
        });
      }
    }
    return dataArr;
  }
  const rate = Number(props.systemMemory) / 100;
  chartOption.value = {
    polar: { radius: ["75%", "80%"], center: ["50%", "50%"] },
    angleAxis: {
      max: 100,
      clockwise: false,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false },
    },
    radiusAxis: {
      type: "category",
      show: true,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        value: 50,
        type: "liquidFill",
        name: "内存占用",
        radius: "70%",
        center: ["50%", "50%"],
        data: [rate, rate, rate],
        backgroundStyle: { borderWidth: 1, color: "rgba(62, 208, 255, 1)" },
        amplitude: "6%",
        color: [
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 1, color: "#6CDEFC" },
              { offset: 0, color: "#429BF7" },
            ],
            globalCoord: false,
          },
        ],
        label: {
          fontSize: 40,
          color: "#fff",
          textAlign: "center",
        },
        outline: { show: false },
      },
      {
        type: "pie",
        zlevel: 0,
        silent: true,
        radius: ["76%", "78%"],
        z: 1,
        label: { show: false },
        labelLine: { show: false },
        data: Pie(),
      },
      {
        name: "",
        type: "bar",
        roundCap: true,
        z: 2,
        showBackground: false,
        data: [rate * 100],
        coordinateSystem: "polar",
        barWidth: 30,
        itemStyle: {
          opacity: 1,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: "#19A4BB" },
            { offset: 1, color: "#22C7DA" },
          ]),
        },
      },
    ],
  };
};
watch(
  () => props.systemMemory,
  () => {
    initChart();
  }
);
</script>
