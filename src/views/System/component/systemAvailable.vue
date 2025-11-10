<template>
  <div style="width: 100%; height: 100%" class="systemAvailableContainer">
    <div class="pie">
      <instrument-pie :data="averageValue" />
    </div>
    <div class="data" v-if="chartData">
      <div class="item" v-for="item in list" :key="item.key">
        <div class="title">
          {{ item.name }}<br />
          微服务
        </div>
        <div class="pieWrap">
          <v-chart
            :option="getChartOption(chartData[item.key])"
            class="chart"
          />
        </div>
        <div class="num">{{ chartData[item.key] || "0%" }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import instrumentPie from "./instrumentPie.vue";
import scale from "../../../assets/base/scale.png";

const props = defineProps({
  chartData: {
    type: Object,
    default: () => null,
  },
});
const list = [
  { name: "设计", key: "designAvailableNum" },
  { name: "计算", key: "checkAvailableNum" },
  { name: "模块", key: "moduleAvailableNum" },
  { name: "系统", key: "checkAvailableNum" },
];

const averageValue = computed(() => {
  if (!props.chartData) return 0;

  // 获取有效的百分比字符串值并转换为数字
  const validValues = list
    .map((item) => props.chartData[item.key])
    .filter((val) => val && typeof val === "string" && val.endsWith("%"))
    .map((val) => parseFloat(val.replace("%", "")));

  // 如果没有有效数据，返回默认值
  if (validValues.length === 0) return 0;

  // 计算平均值并格式化为百分比字符串
  const sum = validValues.reduce((acc, val) => acc + val, 0);
  const average = sum / validValues.length;
  return Math.round(average);
});

const getChartOption = (val) => {
  const data = 15 || parseInt(val);
  return {
    legend: { show: false },
    graphic: [
      {
        type: "image",
        id: "bg",
        left: "center",
        top: "center",
        style: {
          image: scale,
          width: 40, // ✅ 控制图片大小（根据你的饼图实际直径调整）
          height: 40,
        },
        z: -10, // ✅ 置于饼图下层
      },
    ],
    grid: {
      top: "0",
      left: "0",
      containLabel: false,
    },
    xAxis: [
      {
        show: false,
      },
    ],
    series: [
      {
        name: 1,
        type: "pie",
        radius: ["70%", "85%"],
        center: ["50%", "50%"],
        roundCap: true,
        label: {
          show: false,
        },
        itemStyle: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
        },
        data: [
          {
            value: data,
            itemStyle: {
              color: "#FA6400",
              borderRadius: 10, // ✅ 兼容旧版本的圆角
            },
          },
          {
            value: 100,
            name: "",
            itemStyle: {
              color: "#000",
              borderWidth: 0,
            },
            tooltip: {
              show: false,
            },
            silent: true,
            hoverAnimation: false,
          },
        ],
      },
    ],
  };
};
</script>

<style lang="scss" scoped>
.systemAvailableContainer {
  display: flex;
  align-items: center;
}

.pie {
  width: 60%;
  height: 100%;
}

.data {
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 50px;

  .item {
    width: 192px;
    height: 52px;
    background-image: url("../../../assets/base/itemBg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-top: 16px;
    display: flex;

    .pieWrap {
      flex: 1;
      width: 0;
      height: 100%;
    }

    .title {
      width: 30%;
      font-size: 14px;
      color: #fff;
      display: flex;
      justify-content: flex-end;
      text-align: center;
    }

    .num {
      font-size: 16px;
      color: #66ffff;
      height: 100%;
      display: flex;
      align-items: center;
      padding-right: 10px;
      width: 60px;
      justify-content: center;
    }
  }
}
</style>