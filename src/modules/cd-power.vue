<template>
  <div class="rightBottom">
    <Title :text="$t('common.title6')" />
    <v-chart :option="chartOption" class="chart" />
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import Title from '@/modules/title.vue';
import dayjs from 'dayjs';

const props = withDefaults(
  defineProps<{
    data: any;
  }>(),
  { data: [] },
);

const chartOption = ref<any>({});
const initChart = () => {
  let dataList = [
    {
      name: '12月',
      value: '1',
    },
    {
      name: '1月',
      value: '6',
    },
    {
      name: '2月',
      value: '6.5',
    },
    {
      name: '3月',
      value: '5.32',
    },
    {
      name: '4月',
      value: '12',
    },
    {
      name: '5月',
      value: '24',
    },
    {
      name: '6月',
      value: '18',
    },
  ];

  let dataList1 = [
    {
      name: '12月',
      value: '17',
    },
    {
      name: '1月',
      value: '2',
    },
    {
      name: '2月',
      value: '6.5',
    },
    {
      name: '3月',
      value: '5.3',
    },
    {
      name: '4月',
      value: '0',
    },
    {
      name: '5月',
      value: '5.2',
    },
    {
      name: '6月',
      value: '5.8',
    },
  ];

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
    grid: {
      left: '5%',
      right: '5%',
      bottom: '8%',
      top: '25%',
      containLabel: true,
    },
    xAxis: {
      axisLine: {
        lineStyle: {
          color: '#397cbc',
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
          color: 'rgba(255,255,255,0.8)',
          fontSize: '12',
        },
      },
      data: props.data.map((i: any) => {
        return dayjs(i.date_time).format('HH:mm');
      }),
    },
    yAxis: [
      {
        name: 'MW',
        nameTextStyle: {
          color: 'rgba(255,255,255,0.8)',
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
          lineStyle: {
            color: '#11366e',
          },
        },
      },
    ],
    series: [
      {
        name: '充电功率',
        type: 'line',
        smooth: true, //是否平滑曲线显示
        showSymbol: true,

        itemStyle: {
          color: '#F3A22D',
          borderColor: '#F3A22D',
          borderWidth: 1,
        },
        lineStyle: {
          normal: {
            width: 2,
            color: {
              type: 'linear',
              colorStops: [
                {
                  offset: 0,
                  color: '#F3A22D', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#F3A22D', // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
            shadowColor: '#F3A22D',
            shadowBlur: 30,
            shadowOffsetY: 5,
          },
        },
        areaStyle: {
          //区域填充样式
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(243,162,45, 0.6)',
                },
                {
                  offset: 0.6,
                  color: 'rgba(243,162,45, 0.2)',
                },
                {
                  offset: 0.8,
                  color: 'rgba(243,162,45, 0.1)',
                },
              ],
              false,
            ),
            shadowColor: 'rgba(243,162,45, 0.1)',
            shadowBlur: 6,
          },
        },
        data: props.data.map((i: any) => {
          return i.input_power;
        }),
      },
      {
        name: '放点功率',
        type: 'line',
        smooth: true, //是否平滑曲线显示
        showSymbol: true,
        itemStyle: {
          color: '#63d2e7',
          borderColor: '#63d2e7',
          borderWidth: 1,
        },
        lineStyle: {
          normal: {
            width: 2,
            color: '#63d2e7',
            shadowColor: '#63d2e7',
            shadowBlur: 30,
            shadowOffsetY: 5,
          },
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: '#17859b',
                },
                {
                  offset: 1,
                  color: '#114554',
                },
              ],
              false
            ),
            shadowColor: '#114554',
            shadowBlur: 6,
          },
        },
        data: props.data.map((i: any) => {
          return i.out_power;
        }),
      },
    ],
  };
};

onMounted(() => {
  initChart();
});
</script>

<style scoped lang="less">
.rightBottom {
  flex: 1 1;
  color: #47f0f2;
  background: url('../assets/bg_sm.png');
  background-size: 98% 95%;
  background-repeat: no-repeat;
  background-position: 50%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 28px;

  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>