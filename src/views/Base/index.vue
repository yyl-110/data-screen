<template>
  <div class="systemContainer">
    <screen-container :width="1920" :height="1080">
      <div class="container">
        <header class="header">
          <img src="../../assets/common/back.png" alt="" class="back" @click="back" />
          <img src="../../assets/common/baseTitle.png" alt="" class="title" />
          <!-- 时间 -->
          <time-clock />
        </header>
        <main>
          <el-row style="height: 100%; padding: 30px 24px 42px" :gutter="24">
            <el-col :span="8" style="height: 50%">
              <div class="knowledge">
                <Title text="知识看板" />
                <div class="wrap">
                  <knowledge-bar :chartData="systemInfo?.knowledgeList" />
                </div>
              </div>
            </el-col>
            <el-col :span="8" style="height: 50%">
              <div class="knowledgeTotal">
                <Title text="知识汇总" />
                <div class="wrap">
                  <knowledge-total :chartData="systemInfo?.knowledgePieChart" />
                </div>
              </div>
            </el-col>
            <el-col :span="8" style="height: 50%">
              <div class="knowledgeRank">
                <Title text="知识访问次数排名 TOP10" />
                <div class="wrap">
                  <knowledge-rank :chartData="systemInfo?.applicationRanking" />
                </div>
              </div>
            </el-col>
            <el-col :span="8" style="height: 50%">
              <div class="resourceTotal">
                <Title text="资源汇总" />
                <div class="wrap">
                  <resource-bar :chartData="systemInfo?.resourceSummaryList" />
                </div>
              </div>
            </el-col>
            <el-col :span="16" style="height: 50%">
              <div class="knowledgeBoard">
                <Title text="知识访问看板" showSelect showTime :timeOptions="timeOptions" @changeTime="changeTime" />
                <div class="wrap">
                  <knowledge-board :chartData="visitReportInfo" :timeType="timeType" />
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
import knowledgeRank from "./component/knowledgeRank.vue";
import resourceBar from "./component/resourceBar.vue";
import knowledgeBoard from "./component/knowledgeBoard.vue";
import knowledgeBar from "./component/knowledgeBar.vue";
import knowledgeTotal from "./component/knowledgeTotal.vue";
import { getModelVisitReport, getReportKnowledgeList } from "@/api";

const timeOptions = [
  {
    value: '1',
    label: "近半年",
  },
  {
    value: '2',
    label: "近一年",
  },
];

const systemInfo = ref({});
const visitReportInfo = ref([])
const timeType = ref('1')

const fetchData = async () => {
  try {
    const res = await getReportKnowledgeList({})
    if (res.code === '0') {
      systemInfo.value = res.data
    }
  } catch (error) {
    console.log('error:', error)
  }
}

const fetchModelVisitReport = async (type) => {
  try {
    // 1：一周。2：一个月。3：一年
    const res = await getModelVisitReport({ type })
    if (res.code === '0') {
      console.log('res:', res.data)
      visitReportInfo.value = res.data
    }
  } catch (error) {
    console.log('error:', error)
  }
}

const back = () => {
  window.history.back();
};

const changeTime = (val) => {
  timeType.value = val
  fetchModelVisitReport(val)
}

onMounted(() => {
  fetchData()
  fetchModelVisitReport(1) // 默认查询一周
})

</script>

<style lang="scss" scoped>
.systemContainer {
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

      .knowledgeBoard {
        width: 100%;
        height: calc(100% - 24px);
        display: flex;
        flex-direction: column;
        margin-top: 24px;
        background: rgba(0, 0, 0, 0.3);

        .wrap {
          width: 100%;
          flex: 1;
          height: 0;
          display: flex;
          justify-content: center;
        }
      }

      .resourceTotal {
        width: 100%;
        height: calc(100% - 24px);
        display: flex;
        flex-direction: column;
        background: rgba(0, 0, 0, 0.3);
        margin-top: 24px;

        .wrap {
          width: 100%;
          flex: 1;
          height: 0;
          display: flex;
          justify-content: center;
          padding: 0 10px;
        }
      }

      .knowledgeRank {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: rgba(0, 0, 0, 0.3);

        .wrap {
          width: 100%;
          flex: 1;
          height: 0;
          display: flex;
          justify-content: center;
          padding: 0 10px;
        }
      }

      .knowledge {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: rgba(0, 0, 0, 0.3);

        .wrap {
          width: 100%;
          flex: 1;
          height: 0;
          display: flex;
          justify-content: center;
        }
      }

      .knowledgeTotal {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: rgba(0, 0, 0, 0.3);

        .wrap {
          width: 100%;
          flex: 1;
          height: 0;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}
</style>