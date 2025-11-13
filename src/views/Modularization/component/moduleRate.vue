<template>
  <div style="width: 90%; height: 100%">
    <v-chart :option="chartOption" class="chart" />
  </div>
</template>

<script setup>
import * as echarts from "echarts";
const chartOption = ref({});

const props = defineProps({
  chartData: {
    type: Object,
    default: () => { },
  },
});
const initChart = () => {
  const xData = props.chartData.map(item => item.nameCN)
  const seriesData = [{ name: '模块化率', value: props.chartData.map(item => item.para6 || 0) }]
  const colorList = [
    ["#49A9EE", "#49A9EE"],
    ["rgba(165,214,63,.25)", "#A6D63E"],
    ["rgba(255,195,0,.25)", "#FFC300"],
  ];

  chartOption.value = {
    grid: {
      left: "0",
      right: "0",
      bottom: "10%",
      top: "20%",
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
        show: false, //隐藏X轴轴线
        lineStyle: {
          color: "#555f58",
        },
      },
      axisLabel: {
        interval: 0,
        textStyle: {
          color: "#fff", //坐标轴字颜色
        },
        margin: 15,
        rotate: 45, // 文字倾斜角度(可选45、90等)
        formatter: function (value) {
          // 如果文字过长可以截取
          return value.length > 8 ? value.substring(0, 8) + '...' : value;
        }
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
        show: false, //隐藏X轴轴线
        lineStyle: {
          color: "rgba(220,220,220,0.3)",
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
        show: false,
        lineStyle: {
          color: "rgba(220,220,220,0.3)",
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

watch(() => props.chartData, () => {
  initChart();
})
</script>

<style lang="scss" scoped></style>