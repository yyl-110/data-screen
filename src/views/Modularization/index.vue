<template>
  <div class="modularizationContainer">
    <screen-container :width="1920" :height="1080">
      <div class="container">
        <header class="header">
          <img src="../../assets/common/back.png" alt="" class="back" @click="back" />
          <img src="../../assets/common/moduleTitle.png" alt="" class="title" />
          <!-- 时间 -->
          <time-clock />
        </header>
        <main>
          <el-row style="height: 100%; padding: 0 24px 42px">
            <el-col :span="7" style="height: 60%">
              <div class="evaluate">
                <Title text="模块评价体系" showBtn>
                  <div class="evaluateBtn">
                    查看详情
                    <img src="@/assets/common/arrow.png" alt="">
                  </div>
                </Title>
                <div class="wrap">
                  <evaluate :chartData="moduleInfo?.moduleEvaluation" />
                </div>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="statistics">
                <statistics :moduleTotal="moduleInfo?.moduleTotal" :moduleNumList="moduleInfo?.moduleNumList"
                  :resNumList="moduleInfo?.resNumList" />
              </div>
            </el-col>
            <el-col :span="7">
              <div class="top">
                <Title text="模块使用频次排名 TOP50" showBtn>
                  <div>查看清单</div>
                </Title>
                <div class="wrap">
                  <top-bar :chartData="moduleInfo?.useFrequencyList" />
                </div>
              </div>
            </el-col>
            <el-col :span="9" style="height: 40%">
              <div class="moduleRate">
                <Title text="项目模块率" />
                <div class="wrap">
                  <module-rate :chartData="moduleInfo?.moduleRateList" />
                </div>
              </div>
            </el-col>
            <el-col :span="15" style="height: 40%">
              <div class="moduleBoard">
                <Title text="模块访问看板" />
                <div class="wrap">
                  <moduleBoard :chartData="moduleInfo?.moduleUsedList" />
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
import evaluate from "./component/evaluate.vue";
import moduleRate from "./component/moduleRate.vue";
import statistics from "./component/statistics.vue";
import moduleBoard from "./component/moduleBoard.vue";
import topBar from "./component/topBar.vue";
import { getReportModuleList } from "@/api";

const moduleInfo = ref(null)

const fetchData = async () => {
  try {
    const res = await getReportModuleList({})
    if (res.code === '0') {
      moduleInfo.value = res.data
      console.log('moduleInfo.value:', moduleInfo.value)
    }
  } catch (error) {
    console.log('error:', error)
  }
}

const back = () => {
  window.history.back();
};

onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.modularizationContainer {
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

      .moduleBoard {
        width: calc(100% - 26px);
        height: 100%;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        margin-left: 26px;
        background: rgba(0, 0, 0, 0.3);

        .wrap {
          width: 100%;
          flex: 1;
          height: 0;
          display: flex;
          justify-content: center;
        }
      }

      .moduleRate {
        width: 100%;
        height: 100%;
        margin-top: 20px;
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

      .top {
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

      .statistics {
        width: calc(100% - 20px);
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        margin: 0 10px;
      }

      .evaluate {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: rgba(0, 0, 0, 0.3);

        .evaluateBtn {
          display: flex;
          align-items: center;
          font-size: 16px;
          font-weight: bold;
          color: #fff;
          gap: 8px;

          img {
            width: 8px;
          }
        }

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