<template>
  <div style="width: 44%; height: 100%">
    <v-chart :option="chartOption" class="chart" ref="myChart" />
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
const myChart = ref(null);
// 添加定时器引用
const timer = ref(null);
const initChart = () => {
  if (timer.value) {
    clearInterval(timer.value);
  }
  const dataList = props.chartData.map((item) => ({
    name: item.taskStateName,
    value: item.taskNums,
  }));
  let angle = 0;
  const colors = [
    {
      lightColor: "#43CF7C",
    },
    {
      lightColor: "#FFEB3B",
    },
    {
      lightColor: "#D43030",
    },
    {
      lightColor: "#66B2C8",
    },
  ];
  const data1 = dataList.map((v, i) => {
    return {
      ...v,
      itemStyle: { color: colors[i].lightColor },
    };
  });

  let sum = 0;
  dataList.forEach((v) => {
    sum += v.value;
  });

  const option = {
    tooltip: {
      show: true,
      trigger: "item",
    },
    title: {
      text: `{a|${sum}}\n{b|总任务}`,
      x: "center",
      y: "37%",
      textStyle: {
        rich: {
          b: {
            color: "#fff",
            fontSize: 15,
            padding: [10, 0, 0, 0],
            textAlign: "center",
          },
          a: {
            color: "#66FFFF",
            fontSize: 35,
            fontWeight: 600,
            textAlign: "center",
          },
        },
      },
    },
    legend: {
      left: "center",
      bottom: "5%",
      icon: "circle",
      itemWidth: 14,
      itemHeight: 14,
      itemGap: 18,
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      selectedMode: false,
    },
    series: [
      {
        name: "总任务",
        type: "pie",
        center: ["50%", "45%"],
        radius: ["25%", "48%"],
        avoidLabelOverlap: false,
        hoverAnimation: false,
        label: {
          show: false,
          formatter: "({d}%)",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 12,
            fontWeight: "bold",
          },
        },
        labelLine: {
          length: 4,
          length2: 4,
        },
        data: data1,
      },

      {
        type: "custom",
        coordinateSystem: "none",
        silent: true,
        data: [0],
        renderItem (params, api) {
          // 环形图半径
          const r = Math.min(api.getWidth(), api.getHeight()) / 2;
          // 圆心
          const center = {
            x: api.getWidth() * 0.5,
            y: api.getHeight() / 2.2,
          };
          // 大圆半径
          const rBig = r * 0.75;
          // 小圆半径
          const rSmall = r * 0.63;
          // 大圆上的扇形
          const bigSector = [];
          const smallSector = [];
          const circleOnCircle = []; // 小圆上携带的小圆圈
          const sectorSize = 60; // 扇形长度（弧度）
          const sectorInterval = 30; // 扇形与扇形之间的间隔
          const BigStartAngle = 310; // 大扇形起始角度
          for (let i = 0; i < 4; i++) {
            const startAngle =
              ((i * (sectorInterval + sectorSize) + BigStartAngle) * Math.PI) /
              180;
            const endAngle = startAngle + (sectorSize * Math.PI) / 180;
            const smallStartAngle =
              (Math.PI / 180) *
              (280 + angle + i * (sectorSize + sectorInterval));
            const smallEndAngle =
              smallStartAngle + (sectorSize * Math.PI) / 180;
            bigSector.push({
              type: "sector",
              shape: {
                cx: center.x,
                cy: center.y,
                r: rBig,
                r0: rBig * 0.93,
                startAngle,
                endAngle,
              },
              style: {
                fill: "#00C1BD",
                lineWidth: 1,
              },
            });
            smallSector.push({
              type: "sector",
              shape: {
                cx: center.x,
                cy: center.y,
                r: rSmall * 0.93,
                r0: rSmall * 0.87,
                startAngle: smallStartAngle,
                endAngle: smallEndAngle,
              },
              style: {
                fill: "#19ECFF",
                lineWidth: 2,
              },
            });
          }
          return {
            type: "group",
            children: [
              {
                type: "group",
                children: [
                  ...bigSector,
                  {
                    // 外圆环
                    type: "arc",
                    shape: {
                      cx: center.x,
                      cy: center.y,
                      r: rBig,
                    },
                    style: {
                      fill: "transparent",
                      stroke: "#19ECFF",
                      lineWidth: 2,
                    },
                  },
                ],
              },
              {
                // 内圆环
                type: "group",
                children: [
                  ...smallSector,
                  ...circleOnCircle,
                  {
                    // 内圆
                    type: "arc",
                    shape: {
                      cx: center.x,
                      cy: center.y,
                      r: rSmall,
                    },
                    style: {
                      fill: "transparent",
                      stroke: "#19ECFF",
                      lineWidth: 2,
                    },
                  },
                ],
              },
            ],
          };
        },
      },
    ],
  };

  function play () {
    angle += 3;
    nextTick(() => {
      myChart.value && myChart.value.setOption(option);
    });
  }
  nextTick(() => {
    myChart.value && myChart.value.setOption(option);
  });

  setTimeout(() => {
    timer.value = setInterval(() => {
      requestAnimationFrame(play);
    }, 50);
  }, 1000);
};

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
  if (myChart.value) {
    myChart.value.dispose();
  }
});

watch(
  () => props.chartData,
  () => {
    initChart();
  }, { deep: true }
);
</script>

<style lang="scss" scoped></style>