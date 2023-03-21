<template>
  <div class="leftTop">
    <Title :text="$t('common.title1')" />
    <el-select @change="change" v-model="value" class="select" placeholder="Select" size="large"
      style="width: 140px; align-self: flex-end">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <v-chart :option="chartOption" class="chart" />
  </div>
</template>

<script setup lang="ts">
import Title from '@/modules/title.vue';
import dayjs from 'dayjs';
import * as echarts from 'echarts';
// 需要引入 t

const props = withDefaults(
  defineProps<{
    dayIncome: any;
    dayIncome1: any;
  }>(),
  { dayIncome: [], dayIncome1: [] },
);
const options = ref<any[]>([
  {
    value: '1',
    label: '最近七天收益',
  },
  {
    value: '2',
    label: '最近十四天收益',
  },
  {
    value: '3',
    label: '最近三十天收益',
  },
]);
const value = ref<string>('1');
const chartOption = ref<any>({});
const chartRef = ref(null) as any;
const chatValue = ref<any[]>(props.dayIncome)

const initChart = () => {
  chartOption.value = {
    color: ['#fcba62', '#69f0ff'],
    grid: {
      top: '16%',
      left: '1%',
      right: '3%',
      bottom: '8%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      // formatter: '{b}：{c}个',
      backgroundColor: 'rgba(0, 0, 0, 0.63)', //设置背景颜色
      textStyle: {
        color: '#fff',
      },
      borderColor: 'rgba(255,255,255, .5)',
      axisPointer: {
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(0, 255, 233,0)',
              },
              {
                offset: 0.5,
                color: 'rgba(255, 255, 255,1)',
              },
              {
                offset: 1,
                color: 'rgba(0, 255, 233,0)',
              },
            ],
            global: false,
          },
        },
      },
    },
    xAxis: [
      {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#425b78',
          },
        },
        axisLabel: {
          color: '#b9bec6',
          fontSize: 10,
        },
        splitLine: {
          show: false,
        },
        boundaryGap: false,
        data: chatValue.value.map((i: any) => {
          return dayjs(i.date_time).format('MM/DD');
        }),
      },
    ],

    yAxis: [
      {
        type: 'value',
        name: '单位（元）',
        nameTextStyle: {
          color: '#b9bec6',
          fontSize: 12,
        },
        axisLine: {
          lineStyle: {
            color: '#425b78',
            fontSize: 14,
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#587485',
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#b9bec6',
          },
        },
      },
    ],
    series: [
      {
        name: '收益',
        type: 'line',
        lineStyle: {
          normal: {
            color: '#69f0ff',
          },
        },
        symbolSize: 4,
        symbol: 'circle',
        itemStyle: {
          color: '#fff',
          borderColor: 'rgba(255, 255, 255, .2)',
          borderWidth: 10,
          shadowColor: 'rgba(0, 0, 0, 0)',
          shadowBlur: 0,
          shadowOffsetY: 1,
          shadowOffsetX: 1,
        },
        label: {
          color: '#fff',
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
                  color: 'rgba(107,205,216,0.5)',
                },
                {
                  offset: 1,
                  color: 'rgba(143,192,127,0)',
                },
              ],
              false,
            ),
          },
        },
        data: chatValue.value.map((i: any) => {
          return i.income;
        }),
      },
    ],
  };
};

const change = () => {
  if (chatValue.value === props.dayIncome) {
    chatValue.value = props.dayIncome1
  } else {
    chatValue.value = props.dayIncome
  }
}
onMounted(() => {
  initChart();
});
watch(
  () => chatValue.value,
  () => {
    initChart();
  },
  { immediate: true },
);
</script>

<style lang="less" scoped>
.leftTop {
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

  .select {
    /deep/ .el-input__wrapper {
      border: 1px solid #0ddbff;
      border-radius: 2px;
      background: transparent;
      font-size: 12px;
      font-weight: 400;
      color: #0ddbff;
      position: relative;
      height: 32px;
      cursor: pointer;

      .el-input__inner {
        color: #0ddbff;
      }
    }
  }
}
</style>