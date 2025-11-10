<template>
  <div class="itemTitle">
    <span>{{ text }}</span>
    <div class="selectWrap" v-if="showSelect">
      <!-- 项目筛选 -->
      <el-select @change="changeProject" v-model="value1" class="select" placeholder="选择项目" size="large"
        style="width: 197px" v-if="optionsProject && optionsProject.length">
        <el-option v-for="item in optionsProject" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <!-- 阶段筛选 -->
      <el-select @change="changePhase" v-model="value2" class="select" placeholder="选择阶段" size="large"
        style="width: 197px" v-if="showPhase">
        <el-option v-for="item in phaseList" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select @change="changeTime" v-model="value3" class="select" placeholder="选择时间" size="large"
        style="width: 197px" v-if="showTime">
        <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <div class="btnWrap" v-if="showBtn">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useIndexStore } from "@/stores";
import { storeToRefs } from "pinia";

const indexStore = useIndexStore();
const {
  updateSelectProjectId,
  updatePhaseList,
  projectList,
  updateSelectPhaseId,
} = indexStore;
const { selectProjectId, phaseList, selectPhaseId } = storeToRefs(indexStore);

const emits = defineEmits(["changePhase", 'changeTime']);

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  optionsProject: {
    type: Array,
    default: () => [],
  },
  optionsPhase: {
    type: Array,
    default: () => [],
  },
  showSelect: {
    type: Boolean,
    default: false,
  },
  showPhase: {
    type: Boolean,
    default: false,
  },
  // 阶段Id
  phaseId: {
    type: Number,
    default: null,
  },
  // 展示按钮
  showBtn: {
    type: Boolean,
    default: false,
  },
  // 时间筛选
  showTime: {
    type: Boolean,
    default: false,
  },
  timeOptions: {
    type: Array,
    default: () => [],
  }
});

const value1 = ref(selectPhaseId.value); // 项目
const value2 = ref(props.phaseId); // 阶段
const value3 = ref('1'); // 时间

// 修改项目
const changeProject = (val) => {
  updateSelectProjectId(val);

  const phaseList = projectList.find((item) => item.value === val)?.phaseList;
  updatePhaseList(phaseList);
  updateSelectPhaseId(phaseList[0]?.phaseId);
  value2.value = phaseList[0]?.phaseId;
};

// 改变阶段
const changePhase = (val) => {
  value2.value = val;
  emits("changePhase", val);
};

// 修改时间
const changeTime = (val) => {
  value3.value = val;
  emits("changeTime", val);
};

watch(
  selectProjectId.value,
  (val) => {
    if (val) {
      selectProjectId.value && (value1.value = val);
    }
  },
  { immediate: true }
);

watch(
  () => props.phaseId,
  (val) => {
    value2.value = val;
  }
);
</script>

<style scoped lang="scss">
.itemTitle {
  width: 100%;
  height: 51px;
  background-image: url("../assets/common/titleBg.png");
  background-repeat: no-repeat;
  background-size: 597px 100%;
  color: #fff;
  display: flex;
  align-items: center;
  margin-left: -10px;
  padding-left: 76px;
  font-size: 20px;
  font-weight: bold;
  justify-content: space-between;
}

.btnWrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 172px;
  height: 100%;
  background-image: url("../assets/common/btnWrap1.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-align: center;
}

.selectWrap {
  display: flex;
  align-items: center;
  gap: 6px;
}

.select {
  ::v-deep(.el-select__wrapper) {
    border: none;
    box-shadow: none;
    border-radius: 2px;
    background-color: transparent;
    background-image: url("../assets/common/selectBg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    font-size: 12px;
    font-weight: 400;
    color: #fff;
    position: relative;
    height: 49px;
    cursor: pointer;

    .el-select__placeholder {
      color: #fff;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }

    .el-select__suffix {
      position: absolute;
      right: 21px;
    }
  }

  ::v-deep(.el-input__wrapper) {
    border: none;
    box-shadow: none;
    border-radius: 2px;
    background-color: transparent;
    background-image: url("../assets/common/selectBg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    font-size: 12px;
    font-weight: 400;
    color: #fff;
    position: relative;
    height: 49px;
    cursor: pointer;

    .el-input__inner {
      color: #fff;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }

    .el-input__suffix {
      position: absolute;
      right: 21px;
    }
  }
}
</style>