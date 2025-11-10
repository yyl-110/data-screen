<template>
  <div style="width: 100%; height: 100%">
    <v-chart :option="chartOption" class="chart" />
  </div>
</template>

<script setup>
import * as echarts from "echarts";
const props = defineProps({
  chartData: {
    type: Object,
    default: () => { }
  }
})

const chartOption = ref({});

const initChart = () => {
  const colorList = ['#1890FF', '#FACC14', '#2FC25B']
  const dataList = props.chartData.data
  const nameList = props.chartData.title
  let indicatorList = props.chartData.indicator;

  const seriesDataList = dataList.map((item, index) => {
    return {
      ...item,
      symbolSize: [6, 6],
      lineStyle: { //边缘颜色
        color: colorList[index],
      },
      itemStyle: {
        color: colorList[index],
      },
    }
  })

  chartOption.value = {

    tooltip: {
      show: false // 弹层数据去掉
    },
    legend: {
      data: nameList,
      icon: "circle",
      show: true,
      bottom: "5%",
      center: 0,
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 26,
      textStyle: {
        fontSize: 14,
        color: '#fff',
      },
    },
    radar: {
      center: ['50%', '50%'], // 外圆的位置
      radius: '55%',
      name: {
        textStyle: {
          color: '#F0F5FF',
          fontSize: 16,
        }
      },
      // TODO:
      indicator: indicatorList,
      splitArea: {
        // 坐标轴在 grid 区域中的分隔区域，默认不显示。
        show: true,
        areaStyle: {
          // 分隔区域的样式设置。
          color: '#000A5F' // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
        }
      },
      axisLine: {
        // 指向外圈文本的分隔线样式
        lineStyle: {
          color: 'rgba(255,255,255,0)'
        }
      },
      splitLine: {
        lineStyle: {
          type: 'solid',
          color: '#2F4276', // 分隔线颜色
          width: 2 // 分隔线线宽
        }
      }
    },
    series: [
      {
        type: 'radar',
        data: seriesDataList
      }
    ]
  }
}


watch(() => props.chartData, () => {
  console.log('props.chartData', props.chartData)
  initChart();
})
</script>

<style lang="scss" scoped></style>