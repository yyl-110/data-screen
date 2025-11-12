<template>
  <div style="width: 56%; height: 100%">
    <v-chart :option="chartOption" class="chart" />
  </div>
</template>

<script setup>
import * as echarts from "echarts";
const chartOption = ref({});

const props = defineProps({
  chartData: {
    type: Array,
    default: () => [],
  },
});

const initChart = () => {
  /* 项目完成率列表 */
  const completePercentList = props.chartData.map((item) =>
    Math.round((item.completeNums / item.taskNums) * 100)
  );
  /* 未完成率列表 */
  const unCompletePercentList = completePercentList.map((item) => (100 - item));

  chartOption.value = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        label: {
          show: true,
        },
      },
      formatter: function (params) {
        const projectName = params[0].name;
        const completeNums = props.chartData.find(item => item.projectName === projectName)?.completeNums || 0;
        const taskNums = props.chartData.find(item => item.projectName === projectName)?.taskNums || 0;
        const uncompletes = taskNums - completeNums;
        // 添加圆点标识
        return `${projectName}<br />
          <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#43CF7C;"></span>
          已完成: ${completeNums}<br />
          <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#24E2E2;"></span>
          未完成: ${uncompletes}`;
      }
    },
    grid: {
      left: "10%",
      top: "10%",
      right: "5%",
      bottom: "25%",
    },
    legend: {
      show: true,
      right: "5%",
      bottom: "5%",
      textStyle: {
        color: "#ffffff",
        fontSize: 16,
      },
      itemWidth: 16,
      itemHeight: 16,
      data: ["已完成", "未完成"],
    },
    xAxis: {
      data: props.chartData.map((item) => item.projectName),
      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: "#163a5f",
          width: 2,
        },
      },
      axisTick: {
        show: false, //隐藏X轴刻度
        alignWithLabel: true,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#ffffff", //X轴文字颜色
          fontSize: 16,
        },
        interval: 0,
        rotate: 45, // 文字倾斜角度(可选45、90等)
        formatter: function (value) {
          // 如果文字过长可以截取
          return value.length > 6 ? value.substring(0, 6) + "..." : value;
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "%",
        nameTextStyle: {
          color: "#ffffff",
          fontSize: 16,
          padding: [0, 0, 12, -30]
        },
        splitLine: {
          show: false,
          lineStyle: {
            width: 1,
            color: "#CED2DB",
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true, //隐藏X轴轴线
          lineStyle: {
            color: "#163a5f",
            width: 2,
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#ffffff",
            fontSize: 16,
          },
          formatter: function (value) {
            // 将原始数值转换为百分比显示
            return value;
          }
        },
        max: 100
      },
      {
        type: "value",
        name: "",
        nameTextStyle: {
          color: "#ffffff",
          fontSize: 16,
        },
        splitLine: {
          show: false,
          lineStyle: {
            width: 1,
            color: "#CED2DB",
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false, //隐藏X轴轴线
          lineStyle: {
            color: "#163a5f",
            width: 2,
          },
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: "#43CF7C",
            fontSize: 14,
          },
        },
      },
    ],
    series: [
      {
        name: "已完成",
        type: "bar",
        stack: '项目数',
        barWidth: 32,
        // showBackground: true,
        // backgroundStyle: {
        //   color: 'rgba(36,226,226, 0.3)',
        //   borderRadius: [10, 10, 0, 0]
        // },
        itemStyle: {
          color: "#43CF7C",
          // barBorderRadius: [10, 10, 0, 0],
        },
        data: completePercentList,
      },
      {
        name: "未完成",
        type: "bar",
        stack: '项目数',
        barWidth: 32,
        itemStyle: {
          color: "#24E2E2",
          barBorderRadius: [10, 10, 0, 0],
        },
        data: unCompletePercentList,
      },
    ],
  };
};

watch(
  () => props.chartData,
  () => {
    console.log('props.chartData:', props.chartData)
    initChart();
  }, { deep: true }
);
</script>

<style lang="scss" scoped></style>