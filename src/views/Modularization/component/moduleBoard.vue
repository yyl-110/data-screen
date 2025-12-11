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
import _ from 'lodash'
import dayjs from 'dayjs';
const props = defineProps({
  chartData: {
    type: Object,
    default: () => { }
  }
})

const chartOption = ref({});

const config = ref({})
const dataList = ref([])
const monthList = ref([])

const initTable = () => {
  monthList.value = Object.keys(props.chartData[0]).filter(item => item !== 'systemTemp').map(item => `${dayjs(item).get('month') + 1}月`)

  const yearMonthList = Object.keys(props.chartData[0]).filter(item => item !== 'systemTemp');

  dataList.value = props.chartData.map(item => {
    // 根据 monthList 的顺序提取对应的数据值
    const values = yearMonthList.map(month => item[month] || 0);
    return [item.systemTemp, ...values];
  });
  console.log('dataList.value:', dataList.value)

  config.value = {
    header: ['', ...monthList.value],
    data: dataList.value,
    columnWidth: [80],
    align: ['center'],
    headerBGC: "#043C64",
    oddRowBGC: "#051841",
    evenRowBGC: 'transparent',
  }

}
const initChart = () => {
  console.log(props.chartData)
  const colorList = ['#52F5F9', '#0C98EB']

  const seriesData = props.chartData.map((item, index) => {
    const _item = _.cloneDeep(item)
    delete _item.systemTemp
    const dataList = Object.values(_item)
    return {
      name: item.systemTemp,
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
      data: dataList,
    }
  })

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
        rotate: 45, // 添加这行，使标签倾斜45度
        // formatter: function (value) {
        //   // 将每个字符换行显示
        //   return value.split('').join('\n');
        // }
      },
      data: monthList.value
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
            color: '#334984',
          },
        },
        //网格线
        splitLine: {
          lineStyle: {
            color: '#334984',
            type: 'dashed',
          },
        },
      },
    ],
    series: seriesData,
  };
};


watch(() => props.chartData, () => {
  initTable();
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
    width: 65%;
    height: 100%;
    padding-top: 16px;
    padding-bottom: 16px;
  }

  .lineWrap {
    width: 35%;
    height: 100%;

  }
}
</style>