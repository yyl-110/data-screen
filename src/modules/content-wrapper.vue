<template>
  <div class="content-wrapper">
    <el-row style="height: 100%; padding: 0px 20px">
      <el-col :span="6">
        <div class="leftWrap">
          <day-income :dayIncome="dayIncome" :dayIncome1="dayIncome1" />
          <income-rank :data="rankData" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="centerWrap">
          <top-map :data="mapData" :lang="langStr" />
          <day-electricity :data="dayElectricity" />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="rightWrap">
          <today-statistics />
          <power />
          <cd-power :data="inputOutPower" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import DayIncome from '@/modules/day-income.vue';
import IncomeRank from '@/modules/income-rank.vue';
import DayElectricity from '@/modules/day-electricity.vue';
import TopMap from '@/modules/map.vue';
import power from '@/modules/power.vue';
import TodayStatistics from '@/modules/today-statistics.vue';
import CdPower from '@/modules/cd-power.vue';
import useData from '@/compositions/useData';

const props = withDefaults(
  defineProps<{
    langStr: any;
  }>(),
  { langStr: 'cn' },
);

const { ready, rankData, dayIncome, dayIncome1, dayElectricity, inputOutPower, mapData } =
  useData({
    once: false,
  });
</script>

<style lang="less" scoped>
.content-wrapper {
  width: 100%;
  height: calc(100% - 70px);

  .leftWrap {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .centerWrap {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .rightWrap {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
</style>
