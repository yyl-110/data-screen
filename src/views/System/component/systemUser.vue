<template>
  <div style="width: 100%; height: 100%">
    <v-chart :option="chartOption" class="chart" />
  </div>
</template>

<script setup>
import { getReportSystemLoginUser } from "@/api";
import * as echarts from "echarts";

const chartData = ref([])
const chartOption = ref({});
const initChart = () => {
  let xData = chartData.value.map(item => item.userType);
  let seriesData = [
    {
      name: "总人数",
      value: chartData.value.map(item => item.totalLogins),
    },
    {
      name: "近一月访问人数",
      value: chartData.value.map(item => item.lastMonthLogins),
    },
    {
      name: "近一周访问人数",
      value: chartData.value.map(item => item.lastWeekLogins)
    },
  ];
  const colorList = [
    ["#FFFFFF", "#00E5E3"],
    ["#ffffff", "#D43030"],
    ["#F5F5F5", "#F7D111"],
  ];

  chartOption.value = {
    grid: {
      left: "0",
      right: "20",
      bottom: "13%",
      top: "10%",
      containLabel: true,
    },
    color: ["#1DB750", "#C7F36A"],
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: seriesData,
      x: "center",
      bottom: "3%",
      align: "left",
      itemHeight: 13,
      icon: "circle",
      itemWidth: 22,
      itemGap: 20,
      textStyle: {
        fontSize: 12,
        color: "#CCCCCC",
      },
    },
    xAxis: {
      showBackground: true,
      nameTextStyle: {
        color: "#c0c3cd",
        padding: [0, 0, -10, 0],
        fontSize: 14,
      },
      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: "#3875AE",
        },
      },
      axisLabel: {
        interval: 0,
        textStyle: {
          color: "#fff", //坐标轴字颜色
        },
        margin: 15,
      },
      axisTick: {
        show: false, //隐藏X轴刻度
      },
      splitLine: {
        //网格线
        show: false,
      },
      data: xData,
      type: "category",
    },
    yAxis: {
      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: "#3875AE",
        },
      },
      axisTick: {
        show: false, //隐藏X轴刻度
      },
      axisLabel: {
        textStyle: {
          fontSize: 12,
          color: "#CCCCCC",
        },
      },
      splitLine: {
        //网格线
        show: true,
        lineStyle: {
          color: '#334984',
          type: 'dashed',
        },
      },
    },
    series: (function () {
      let series = [];
      for (let i = 0; i < seriesData.length; i++) {
        let serie = {
          name: seriesData[i].name,
          type: "bar",
          barWidth: "16",
          data: seriesData[i].value,
          label: {
            show: false,
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                { offset: 0, color: colorList[i][0] },
                { offset: 1, color: colorList[i][1] },
              ]),
            },
          },
        };
        series.push(serie);
      }
      return series;
    })(),
  };
};

const fetchData = async () => {
  try {
    const res = await getReportSystemLoginUser({})
    if (res.code === '0') {
      chartData.value = res.data
      initChart();
      console.log('res:', res.data)
    }
  } catch (error) {
    console.log('error:', error)
  }
};

onMounted(() => {
  fetchData()
});
</script>

<style lang="scss" scoped></style>