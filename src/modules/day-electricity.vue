<template>
  <div class="bottomWrap">
    <Title :text="$t('common.title5')" />
    <v-chart :option="chartOption" class="chart" />
  </div>
</template>

<script setup lang="ts">
import Title from '@/modules/title.vue';
import * as echarts from 'echarts';
import dayjs from 'dayjs';

const props = withDefaults(
  defineProps<{
    data: any;
  }>(),
  { data: [] },
);
const chartOption = ref<any>({});
const initChart = () => {
  let xData = props.data.map((i: any) => {
    return dayjs(i.date_time).format('MM/DD');
  });
  let seriesData = [
    {
      name: '充电量',
      value: props.data.map((i: any) => i.ChargeEnergy),
    },
    {
      name: '放电量',
      value: props.data.map((i: any) => i.DischargeEnergy),
    },
  ];
  const colorList = [
    ['rgb(106,228,207)', 'rgb(59,136,140)'],
    ['rgb(232,181,89)', 'rgb(230,114,64)'],
  ];

  chartOption.value = {
    grid: {
      left: '4%',
      right: '6%',
      bottom: '5%',
      top: '23%',
      containLabel: true,
    },
    color: ['#1DB750', '#C7F36A'],
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: seriesData,
      x: 'center',
      top: '3%',
      align: 'left',
      itemHeight: 10,
      icon: 'rect',
      itemWidth: 12,
      textStyle: {
        fontSize: 14,
        color: '#fff',
      },
    },
    xAxis: {
      showBackground: true,
      nameTextStyle: {
        color: '#c0c3cd',
        padding: [0, 0, -10, 0],
        fontSize: 14,
      },
      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: '#555f58',
        },
      },
      axisLabel: {
        interval: 0,
        textStyle: {
          color: '#fff', //坐标轴字颜色
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
      type: 'category',
    },
    yAxis: {
      name: 'mWh',
      nameTextStyle: {
        fontSize: 14,
        color: '#fff',
      },
      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: 'rgba(220,220,220,0.3)',
        },
      },
      axisTick: {
        show: false, //隐藏X轴刻度
      },
      axisLabel: {
        textStyle: {
          color: '#fff',
        },
      },
      splitLine: {
        //网格线
        show: true,
        lineStyle: {
          color: 'rgba(220,220,220,0.3)',
        },
      },
    },
    series: (function () {
      let series = [];
      for (let i = 0; i < seriesData.length; i++) {
        let serie = {
          name: seriesData[i].name,
          type: 'bar',
          barWidth: '13%',
          data: seriesData[i].value,
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

onMounted(() => {
  initChart();
});
</script>

<style scoped lang="less">
.bottomWrap {
  background: url('../assets/bg_bottom.png');
  background-size: 98% 95%;
  background-repeat: no-repeat;
  background-position: 50%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  flex: 32% 1;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>