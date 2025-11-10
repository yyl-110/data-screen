<template>
  <div class="moduleBoardWrap">
    <div class="scrollBoard">
      <scroll-board :config="config" style="width:100%;height:100%" />
    </div>
    <div class="lineWrap">
      <v-chart :option="chartOption" class="chart" />
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ScrollBoard } from '@kjgl77/datav-vue3'
import dayjs from 'dayjs';
import { monthMap } from './data';


const props = defineProps({
  chartData: {
    type: Array,
    default: () => [],
  },
  /* 时间筛选 1半年 2一年 */
  timeType: {
    type: String,
    default: '1',
  }
})

const config = ref({})

const chartOption = ref({});

const getMonthList = computed(() => {
  // 半年
  const months = []
  for (let i = 5; i >= 0; i--) {
    months.push(dayjs().subtract(i, 'month').format('YYYY-MM'))
  }
  // 一一年
  const yearMonths = []
  for (let i = 11; i >= 0; i--) {
    yearMonths.push(dayjs().subtract(i, 'month').format('YYYY-MM'))
  }
  return props.timeType === '1' ? months : yearMonths
})

const nameList = computed(() => props.chartData.map(item => item.categoryName))

const colorList = ['#52F5F9', '#63d2e7', '#1890FF', '#FACC14', '#2FC25B']

const chartDataList = ref([])
const initTable = () => {
  const list = []
  const data = props.chartData.map((item, index) => {
    const dataList = getMonthList.value.map(val => {
      if (item.visit_month === val) {
        return item.visit_count
      }
      return 0
    })
    list.push(dataList)
    return [item.categoryName, ...dataList]
  })
  chartDataList.value = list
  config.value = {
    header: ['', ...getMonthList.value.map(item => dayjs(item).format('M月'))],
    data,
    columnWidth: [80],
    align: ['center'],
    headerBGC: "#043C64",
    oddRowBGC: "#051841",
    evenRowBGC: 'transparent',
  }
}
const initChart = () => {
  const seriesData = chartDataList.value.map((item, index) => (
    {
      name: nameList.value[index],
      type: 'line',
      smooth: false, //是否平滑曲线显示
      showSymbol: true,

      itemStyle: {
        color: colorList[index],
        borderColor: colorList[index],
        borderWidth: 1,
      },
      lineStyle: {
        normal: {
          width: 3,
          color: colorList[index],
        },
      },
      data: item,
    }
  ))
  console.log('seriesData:', seriesData)

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
      show: false,
    },
    grid: {
      left: '5%',
      right: '0',
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
          color: '#BACDF5',
          fontSize: 12,
          lineHeight: 20,
        },
        formatter: function (value) {
          // 将每个字符换行显示
          return value.split('').join('\n');
        }
      },
      data: getMonthList.value.map(item => monthMap[dayjs(item).format('M月')])
    },
    yAxis: [
      {
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
          show: true,
          lineStyle: {
            color: '#334984',
            type: 'dashed',
          },
        },
      },
    ],
    series: seriesData
  };
};


watch(() => props.chartData, () => {
  initTable()
  initChart();
}, { deep: true })

</script>

<style lang="scss" scoped>
.moduleBoardWrap {
  display: flex;
  align-items: center;
  padding-left: 20px;
  width: 100%;
  height: 100%;

  .scrollBoard {
    width: 55%;
    height: 100%;
    padding-top: 43px;
    padding-bottom: 16px;
  }

  .lineWrap {
    width: 45%;
    height: 100%;

  }
}
</style>