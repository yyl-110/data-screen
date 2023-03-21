<template>
  <div class="rightCenter">
    <Title :text="$t('common.title4')" />
    <div class="chartBody">
      <div class="item" v-for="(item, inx) in data" :key="inx">
        <div class="chart">
          <v-chart :option="chartOption[inx]" class="chart" />
        </div>
        <span class="title">{{ item.title }}</span>
        <span class="value">{{ item.value }}MW</span>
      </div>
      <!-- <div class="item">
        <div class="chart">
          <v-chart :option="chartOption[1]" class="chart" />
        </div>
        <span class="title">放电功率</span>
        <span class="value">1.23MW</span>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from '@/modules/title.vue';

const chartOption1 = ref<any>({});
const chartOption = ref<any>([{}, {}]);

// const data = [0.77, 0.55];
const data = ref<any>([
  {
    title: '充电功率',
    value: 0.77,
  },
  {
    title: '放电功率',
    value: 0.25,
  },
]);
let timer: any = setInterval(() => {
  data.value = [{
    title: '充电功率',
    value: Math.random().toFixed(2),
  },
  {
    title: '放电功率',
    value: Math.random().toFixed(2),
  },]
  initChart()
}, 2000)
const colorList = ['rgb(109,206,168)', 'rgb(101,151,233)', 'rgb(101,216,251)'];

const getColor = (val: number) => {
  if (val < 0.25) return colorList[0];
  if (val < 0.5 && val > 0.25) return colorList[1];
  if (val > 0.5 && val < 1) return colorList[2];
};

const initChart = () => {
  data.value.forEach((i: any, inx: number) => {
    chartOption.value[inx] = {
      series: [
        {
          type: 'gauge',
          detail: {
            show: false,
          },
          name: '123',
          splitNumber: 4,
          radius: '79%',
          endAngle: -60,
          startAngle: 240,
          data: [i.value * 100],
          splitLine: {
            show: true,
            length: -10,
            splitNumber: 4,
            lineStyle: {
              color: '#fff',
              width: 2,
            },
          },
          axisLabel: {
            distance: 30,
            textStyle: {
              color: 'rgba(255,255,255,0.7)',
              fontSize: '12',
            },
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: '#fff',
              width: 2,
            },
            length: -15,
            splitNumber: 4,
          },
          axisLine: {
            show: true,
            onZero: true,
            onZeroAxisIndex: 0,
            lineStyle: {
              width: 15,
              shadowBlur: 0,
              color: [
                [0.25, 'rgb(109,206,168)'],
                [0.5, 'rgb(101,151,233)'],
                [1, 'rgb(101,216,251)'],
              ],
            },
          },
          itemStyle: {
            color: getColor(i.value),
            opacity: 1,
          },
        },
      ],
    };
  });
};


onBeforeUnmount(() => {
  clearInterval(timer); //清除定时器
})

onMounted(() => {
  initChart();
});
</script>

<style scoped lang="less">
.rightCenter {
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

  .chartBody {
    flex: 1 1;
    display: flex;
    width: 100%;

    .item {
      flex: 1 1;
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: center;

      .title {
        font-size: 15px;
        font-weight: 700;
        color: #5fffd0;
        line-height: 28px;
        text-shadow: 0 0 4px rgba(4, 44, 103, 0.35);
      }

      .value {
        font-weight: 700;
        color: #fff;
        line-height: 28px;
        text-shadow: 0 0 4px rgba(4, 44, 103, 0.35);
      }

      &:last-child {
        .chart {
          flex: 1 1;
          width: 100%;
          background: url('../assets/right_center_bg2.png');
          background-size: 85% 85%;
          background-repeat: no-repeat;
          background-position: 50%;
        }
      }

      &:first-child {
        .chart {
          flex: 1 1;
          width: 100%;
          background: url('../assets/right_center_bg1.png');
          background-size: 85% 85%;
          background-repeat: no-repeat;
          background-position: 50%;
        }
      }
    }
  }
}
</style>