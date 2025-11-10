<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { useIndexStore } from "./stores";
import { getReportProjectPhaseList } from "./api";

const indexStore = useIndexStore();
const {
  updateProjectList,
  updateSelectProjectId,
  updateSelectPhaseId,
  updatePhaseList,
} = indexStore;
// 查询项目列表
const fetchProjectList = async () => {
  try {
    const res: any = await getReportProjectPhaseList();
    if (res.code === "0") {
      updateProjectList(res.data);
      updateSelectProjectId(res.data[0]?.projectId);
      if (res.data[0]?.phaseList && res.data[0]?.phaseList.length) {
        updatePhaseList(res.data[0]?.phaseList);
        updateSelectPhaseId(res.data[0]?.phaseList[0]?.phaseId);
      }
    }
  } catch (error) {
    console.log("error:", error);
  }
};

onMounted(() => {
  fetchProjectList();
});
</script>

<style lang="scss">
body,
html {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;

  * {
    box-sizing: border-box;
  }
}

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  // background-image: url('./assets/screen_bg.png');
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
  // color: #fff;
}
</style>
