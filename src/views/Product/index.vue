<template>
  <div class="productContainer">
    <screen-container :width="1920" :height="1080">
      <div class="container">
        <header class="header">
          <img src="../../assets/common/back.png" alt="" class="back" @click="back" />
          <img src="../../assets/product/title.png" alt="" class="title" />
          <!-- 时间 -->
          <time-clock />
        </header>
        <main>
          <el-row style="height: 100%; padding: 30px" :gutter="18">
            <el-col :span="12">
              <div class="overview">
                <Title text="项目概览" showSelect :optionsProject="projectList" />
                <div class="list">
                  <div class="item" v-for="(item, index) in list" :key="index">
                    <div>
                      <count-to :startVal="0" :endVal="item.num" :duration="1000" :autoplay="true" :separator="','"
                        class="count-style" :style="{ color: item.color }" />
                    </div>
                    <span>{{ item.title }}</span>
                  </div>
                </div>
                <div class="lineWrap">
                  <Overview :data="productInfo?.phaseList" />
                </div>
              </div>
              <div class="task">
                <Title text="项目任务" showSelect showPhase :phaseId="taskPhaseId" @changePhase="changeTaskPhase" />
                <div class="taskPie">
                  <complete-pie :chartData="productInfo?.taskNumsList" />
                  <product-line :chartData="productInfo?.project5List" />
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="board">
                <Title text="项目交付看板" showSelect showPhase :phaseId="interactionPhaseId"
                  @changePhase="changeInteractionPhase" />
                <div class="wrap">
                  <interaction :chartData="deliveryInfo" />
                </div>
              </div>
              <div class="picture">
                <Title text="二维图纸进展" />
                <div class="pieWrap">
                  <div class="row1">
                    <div class="pieItem" v-for="(item, index) in pdmPicReportList.slice(0, 3)" :key="index">
                      <div class="pie">
                        <pie :data="item.value" />
                      </div>
                      <span>{{ item.title }}</span>
                    </div>
                  </div>
                  <div class="row2">
                    <div class="pieItem" v-for="(item, index) in pdmPicReportList.slice(3)" :key="index">
                      <div class="pie">
                        <pie :data="item.value" />
                      </div>
                      <span>{{ item.title }}</span>
                    </div>
                  </div>
                  <div class="hint">
                    图纸签审进度%=完成签审图纸数量/已出图纸数量
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </main>
      </div>
    </screen-container>
  </div>
</template>

<script setup>
import ScreenContainer from "@/components/screen-container.vue";
import timeClock from "@/components/time-clock.vue";
import Title from "@/components/title.vue";
import Overview from "./component/overview.vue";
import interaction from "./component/interaction.vue";
import pie from "./component/picPie.vue";
import completePie from "./component/completePie.vue";
import productLine from "./component/productLine.vue";
import { deliveryReport, getReportProjectList, pdmPicReport } from "@/api";
import { useIndexStore } from "@/stores";
import { storeToRefs } from "pinia";

const indexStore = useIndexStore();
const { selectProjectId, selectPhaseId, projectList } = storeToRefs(indexStore);

const productInfo = ref({});
const pdmPicReportList = ref([]);
const deliveryInfo = ref({});

const interactionPhaseId = ref(null); // 项目交付看板阶段id
const taskPhaseId = ref("-1"); // 项目任务阶段id

const list = ref([]);

const back = () => {
  window.history.back();
};

const changeTaskPhase = (val) => {
  taskPhaseId.value = val;
  fetchData(val);
};

const changeInteractionPhase = (val) => {
  interactionPhaseId.value = val;
  fetchDeliveryData();
};

// 二位图纸进展
const fetchPdmPicReport = async () => {
  try {
    const res = await pdmPicReport({ projectId: selectProjectId.value });
    if (res.code === "0") {
      const keys = Object.keys(res.data);

      pdmPicReportList.value = keys.map((key) => ({
        title: key,
        value: res.data[key],
      }));
    }
  } catch (error) {
    console.log("error:", error);
  }
};

// 产品设计看板
const fetchData = async (val) => {
  try {
    const phaseIdData = val ? val : selectPhaseId.value;
    const res = await getReportProjectList({
      projectId: selectProjectId.value,
      phaseId: phaseIdData === "-1" ? "" : phaseIdData,
    });
    if (res.code === "0") {
      productInfo.value = res.data;
      list.value = [
        {
          title: "项目总数",
          num: res.data.totleNum,
          color: "#2A82E4",
        },
        {
          title: "在建项目",
          num: res.data.inDesignNum,
          color: "#FFAF1A",
        },
        {
          title: "完成项目",
          num: res.data.completedNum,
          color: "#43CF7C",
        },
        {
          title: "延期项目",
          num: res.data.postponementNum,
          color: "#D43030",
        },
      ];
    }
  } catch (error) {
    console.log("error:", error);
  }
};

// 项目交付看板
const fetchDeliveryData = async () => {
  try {
    const res = await deliveryReport({
      phaseId:
        interactionPhaseId.value === "-1" ? "" : interactionPhaseId.value,
      projectId: selectProjectId.value,
    });
    if (res.code === "0") {
      deliveryInfo.value = res.data;
    }
  } catch (error) {
    console.log("error:", error);
  }
};

watch(
  () => selectProjectId.value,
  () => {
    if (selectProjectId.value) {
      interactionPhaseId.value = "-1";
      taskPhaseId.value = "-1";
      fetchData();
      fetchPdmPicReport();
      fetchDeliveryData();
    }
  },
  { immediate: true }
);

// watch(
//   () => selectPhaseId.value,
//   () => {
//     if (selectPhaseId.value) {
//       interactionPhaseId.value = selectPhaseId.value;
//       taskPhaseId.value = selectPhaseId.value;
//       fetchDeliveryData();
//     }
//   },
//   { immediate: true }
// );
</script>

<style lang="scss" scoped>
.productContainer {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/common/commonBg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .header {
      width: 100%;
      height: 97px;
      padding: 0 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url("../../assets/common/headerBg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;

      .back {
        width: 35px;
        position: absolute;
        left: 80px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }

      .title {
        width: 357px;
      }
    }

    main {
      width: 100%;
      flex: 1;
      height: 0;

      .overview {
        width: 100%;
        height: 45%;
        background: rgba(2, 2, 2, 0.4);

        .list {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 94px;

          .item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            div {
              width: 80px;
              height: 80px;
              background-image: url("../../assets/product/groupBg.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              display: flex;
              align-items: center;
              justify-content: center;

              .count-style {
                font-size: 50px;
                font-weight: bold;
              }
            }

            span {
              font-size: 16px;
              color: #fff;
              line-height: 24px;
              margin-top: 10px;
            }
          }
        }

        .lineWrap {
          margin-top: 26px;
          width: 100%;
          height: 200px;
          display: flex;
          justify-content: center;
        }
      }

      .board {
        width: 100%;
        height: 45%;
        background: rgba(2, 2, 2, 0.4);
        display: flex;
        flex-direction: column;

        .wrap {
          width: 100%;
          flex: 1;
          height: 0;
          display: flex;
          justify-content: center;
          margin-top: 28px;
        }
      }

      .picture {
        width: 100%;
        background: rgba(2, 2, 2, 0.4);
        flex: 1;

        .pieWrap {
          margin-top: 20px;

          .hint {
            color: #fff;
            width: 100%;
            text-align: right;
            margin-top: 10px;
            padding-right: 20px;
          }

          .row1 {
            display: flex;
            justify-content: space-around;
            padding: 0 10%;

            .pieItem {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              .pie {
                width: 145px;
                height: 145px;
              }

              span {
                color: #fff;
                font-size: 18px;
                line-height: 24px;
              }
            }
          }

          .row2 {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;

            .pieItem {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              .pie {
                width: 145px;
                height: 145px;
              }

              span {
                color: #fff;
                font-size: 18px;
                line-height: 24px;
              }
            }
          }
        }
      }

      .task {
        width: 100%;
        background: rgba(2, 2, 2, 0.4);
        flex: 1;
        height: 0;
        display: flex;
        flex-direction: column;

        .taskPie {
          flex: 1;
          display: flex;
          align-items: center;
        }
      }
    }

    .el-col {
      display: flex;
      flex-direction: column;
      row-gap: 18px;
    }
  }
}
</style>