<template>
  <div style="width: 100%; height: 100%">
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
  const xData = props.chartData.map(item => item.title)
  const seriesData = props.chartData.map(item => item.totalCount)
  chartOption.value = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        label: {
          show: true
        }
      }
    },
    grid: {
      left: "5%",
      top: "15%",
      right: "5%",
      bottom: "10%"
    },
    xAxis: {
      data: xData,
      axisLine: {
        show: false, //隐藏X轴轴线
        lineStyle: {
          color: "#163a5f",
          width: 2
        }
      },
      axisTick: {
        show: false, //隐藏X轴刻度
        alignWithLabel: true
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#ffffff", //X轴文字颜色
          fontSize: 16
        },
        interval: 0
      }
    },
    yAxis: [
      {
        type: "value",
        name: "",
        nameTextStyle: {
          color: "#ffffff",
          fontSize: 16
        },
        splitLine: {
          show: false,
          lineStyle: {
            width: 1,
            color: "#CED2DB"
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false, //隐藏X轴轴线
          lineStyle: {
            color: "#163a5f",
            width: 2
          }
        },
        axisLabel: {
          show: false,
        }
      },
      {
        type: "value",
        name: "",
        nameTextStyle: {
          color: "#ffffff",
          fontSize: 16
        },
        splitLine: {
          show: false,
          lineStyle: {
            width: 1,
            color: "#CED2DB"
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false, //隐藏X轴轴线
          lineStyle: {
            color: "#163a5f",
            width: 2
          }
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: "#797A7F",
            fontSize: 14
          }
        }
      }
    ],
    series: [
      {
        name: "资源数",
        type: "bar",
        barWidth: 32,
        // showBackground: true,
        // backgroundStyle: {
        //   color: 'rgba(36,226,226, 0.3)',
        //   borderRadius: [10, 10, 0, 0]
        // },
        itemStyle: {
          color: '#24E2E2',
          barBorderRadius: [10, 10, 0, 0]
        },
        data: seriesData
      },
      {
        // name: '背景',
        type: "bar",
        barWidth: 32,
        xAxisIndex: 0,
        yAxisIndex: 1,
        barGap: "-100%",
        data: xData.map(item => 1),//背景阴影长度
        itemStyle: {
          normal: {
            color: "rgba(36,226,226, 0.3)",
            barBorderRadius: [10, 10, 0, 0]
          }
        },
        tooltip: {
          show: false
        },
        label: {
          show: true,
          position: "top",
          formatter: (params) => seriesData[params.dataIndex], // 显示实际值
          color: "#ffffff",
          distance: 10,
          fontSize: 16
        },
        zlevel: 9
      }
    ]
  };

}

watch(() => props.chartData, () => {
  initChart();
})

</script>

<style lang="scss" scoped></style>