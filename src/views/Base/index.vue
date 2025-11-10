<template>
  <div class="baseContainer">
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
              <div class="userRank">
                <Title text="活跃用户榜单" />
                <div class="wrap">
                  <user-rank :userList="baseInfo?.activeUsersList" />
                </div>
              </div>
            </el-col>
            <el-col :span="8" style="height: 50%">
              <div class="systemAvailable">
                <Title text="系统可用率" />
                <div class="wrap">
                  <system-available :chartData="baseInfo?.systemAvailable" />
                </div>
              </div>
            </el-col>
            <el-col :span="8" style="height: 50%">
              <div class="totalVisitBoard">
                <Title text="总体访问看板" />
                <div class="wrap">
                  <total-visit-board :chartData="baseInfo?.loginNumList" />
                </div>
              </div>
            </el-col>
            <el-col :span="8" style="height: 50%">
              <div class="systemUser">
                <Title text="系统用户统计" />
                <div class="wrap">
                  <system-user />
                </div>
              </div>
            </el-col>
            <el-col :span="8" style="height: 50%">
              <div class="memoryBoard">
                <Title text="内存占用情况" />
                <div class="wrap">
                  <memory-board :systemMemory="baseInfo?.systemMemory" />
                </div>
              </div>
            </el-col>
            <el-col :span="8" style="height: 50%">
              <div class="visitBoard">
                <Title text="各专业访问看板" />
                <div class="wrap">
                  <visit-board :chartData="baseInfo?.userGroupList" />
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
import visitBoard from "./component/visitBoard.vue";
import memoryBoard from "./component/memoryBoard.vue";
import totalVisitBoard from "./component/totalVisitBoard.vue";
import systemUser from "./component/systemUser.vue";
import userRank from "./component/userRank.vue";
import systemAvailable from "./component/systemAvailable.vue";
import { getReportSystemList } from "@/api";

const baseInfo = ref({});

const fetchData = async () => {
  try {
    const res = await getReportSystemList({});
    if (res.code === "0") {
      console.log(res, 999);
      baseInfo.value = res.data;
    }
  } catch (error) {
    console.log("error:", error);
  }
};

const back = () => {
  window.history.back();
};

onMounted(() => {
  fetchData();
});
</script>

<style lang="scss" scoped>
.baseContainer {
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
        width: 40px;
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

      .systemUser {
        width: 100%;
        display: flex;
        flex-direction: column;
        background: rgba(2, 2, 2, 0.4);
        height: calc(100% - 20px);
        margin-top: 20px;

        .wrap {
          width: 100%;
          flex: 1;
          height: 0;
          display: flex;
          justify-content: center;
          padding-left: 20px;
        }
      }

      .memoryBoard {
        width: 100%;
        display: flex;
        flex-direction: column;
        background: rgba(2, 2, 2, 0.4);
        height: calc(100% - 20px);
        margin-top: 20px;

        .wrap {
          width: 100%;
          flex: 1;
          height: 0;
          display: flex;
          justify-content: center;
        }
      }

      .totalVisitBoard {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: rgba(2, 2, 2, 0.4);

        .wrap {
          width: 100%;
          flex: 1;
          height: 0;
          display: flex;
          justify-content: center;
          padding: 12px 16px;
        }
      }

      .userRank {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: rgba(2, 2, 2, 0.4);

        .wrap {
          width: 100%;
          flex: 1;
          height: 0;
          display: flex;
          justify-content: center;
          // padding: 12px 16px;
        }
      }

      .systemAvailable {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: rgba(2, 2, 2, 0.4);

        .wrap {
          width: 100%;
          flex: 1;
          height: 0;
          display: flex;
          justify-content: center;
        }
      }

      .visitBoard {
        width: 100%;
        display: flex;
        flex-direction: column;
        background: rgba(2, 2, 2, 0.4);
        height: calc(100% - 20px);
        margin-top: 20px;

        .wrap {
          width: 100%;
          flex: 1;
          height: 0;
          display: flex;
          justify-content: center;
          padding: 24px 12px;
        }
      }
    }
  }
}
</style>