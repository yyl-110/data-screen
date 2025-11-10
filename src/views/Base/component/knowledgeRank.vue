<template>
  <div style="width: 100%; height: 100%">
    <v-chart :option="chartOption" class="chart" />
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import rank from '../../../assets/module/rank.png'
import lightPoint from '@/assets/common/lightPoint.png'

const props = defineProps({
  chartData: {
    type: Array,
    default: () => [],
  },
});

const chartOption = ref({});

const initChart = () => {
  const dataList = props.chartData.map(item => ({
    name: item.name,
    value: item.number,
  }));

  const endPercent = 10 / dataList.length * 100

  chartOption.value = {
    grid: {
      left: '0',
      top: 8,
      bottom: 8,
      right: 20,
      containLabel: true,
    },
    tooltip: {
      trigger: "item",
      formatter (params) {
        let res = "";
        const { marker, name, value } = params;
        if (name !== "") {
          res += `${marker}${name} : ${value}`;
        }
        return res;
      },
    },
    dataZoom: [{
      type: "slider",
      show: true,
      yAxisIndex: [0, 1],
      width: 6, //组件宽度
      backgroundColor: "transparent", //两边未选中的滑动条区域的颜色
      borderRadius: 100,
      borderColor: "transparent", //滚动条边框颜色
      fillerColor: "#0E3855", //选中的滑动条区域的颜色
      left: "96%", //滚动条位置
      start: 0, //数据窗口范围的起始百分比
      end: endPercent,
      realtime: true, //是否实时更新
    },],
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
          textStyle: {
            rich: {
              bg: {
                color: '#fff',
                fontSize: 20,
                lineHeight: 33,
                backgroundColor: {
                  image: rank
                },
                height: 33,
                width: 30,
                padding: [4, 0, 0, 0],
              }
            },
          },
          formatter: function (value) {
            const inx = dataList.findIndex(item => item.name === value);
            return `{bg|${inx + 1}}`;
          },
          align: "center",
          //调整文字上右下左
          padding: [0, 30, 0, 0],
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
        data: dataList.map(item => item.name)
      },
      {
        inverse: true,
        axisTick: "none",
        axisLine: "none",
        show: true,
        axisLabel: {
          margin: 20,
          color: "rgba(96, 98, 102, 1)",
          fontSize: 20,
          rich: {
            a: {
              width: 40,
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
            const { name } = dataList[index]
            return `{a|${value}}{b|${name}}`;
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
          color: '#0B2233',
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
                color: 'rgba(1,192,247,0)',
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
        symbol: 'image://' + lightPoint,
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

watch(() => props.chartData, () => {
  initChart()
}, { deep: true })
</script>

<style lang="scss" scoped></style>