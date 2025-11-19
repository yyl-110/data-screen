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
  const monthList = props.chartData.map(item => item.month)
  const dataList = props.chartData.map(item => item['count(tb.month)'])
  const personTime = props.chartData.map(item => item.personTime)
  chartOption.value = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17,95,182,0.5)',
      textStyle: {
        color: '#fff',
      },
      showContent: true,
    },
    legend: {
      // data: seriesData,
      x: "center",
      top: "3%",
      align: "left",
      itemHeight: 13,
      icon: "rect",
      itemWidth: 22,
      itemGap: 20,
      textStyle: {
        fontSize: 12,
        color: "#FFFFFF",
      },
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      axisLine: {
        lineStyle: {
          color: '#334984',
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      //轴线上的字
      axisLabel: {
        show: true,
        textStyle: {
          color: '#CAD9FA',
          fontSize: 12,
        },
      },
      data: monthList
    },
    yAxis: [
      {
        name: '人数',
        nameTextStyle: {
          color: '#CAD9FA',
          padding: [0, 0, 0, -25],
        },
        type: 'value',
        axisTick: {
          show: false,
        },
        //轴线上的字
        axisLabel: {
          show: true,
          textStyle: {
            fontSize: '12',
            color: 'rgba(255,255,255,0.5)',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#397cbc',
          },
        },
        //网格线
        splitLine: {
          show: true,
          lineStyle: {
            color: '#334984',
            type: 'dashed',
          },
        },
      },
      {
        name: '人次',
        nameTextStyle: {
          color: '#CAD9FA',
          padding: [0, 0, 0, 25],
        },
        type: 'value',
        position: 'right', // 设置为右侧
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          textStyle: {
            fontSize: '12',
            color: 'rgba(255,255,255,0.5)',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#397cbc',
          },
        },
        splitLine: {
          show: false, // 可以隐藏网格线避免重叠
        },
      }
    ],
    series: [
      {
        name: '登录人数',
        type: 'line',
        smooth: false, //是否平滑曲线显示
        showSymbol: true,

        itemStyle: {
          color: '#0C98EB',
          borderColor: '#0C98EB',
          borderWidth: 1,
        },
        lineStyle: {
          normal: {
            width: 3,
            color: '#0C98EB',
          },
        },
        data: dataList,
        // 指定使用左侧Y轴
        yAxisIndex: 0,
      },
      {
        name: '登录人次',
        type: 'line',
        smooth: false, //是否平滑曲线显示
        showSymbol: true,
        itemStyle: {
          color: '#63d2e7',
          borderColor: '#63d2e7',
          borderWidth: 1,
        },
        lineStyle: {
          normal: {
            width: 3,
            color: '#63d2e7',
          },
        },
        data: personTime,
        // 指定使用右侧Y轴
        yAxisIndex: 1,
      },
    ],
  };
};

watch(() => props.chartData, () => {
  initChart()
}, { deep: true })
</script>

<style lang="scss" scoped></style>