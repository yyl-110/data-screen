<template>
  <div class="wrap">
    <span>{{ yearTime }}</span>
    <span class="time">{{ time }}</span>
  </div>
</template>

<script setup lang="ts">
import useClock from '@/compositions/useClock';
import dayjs from 'dayjs';

const { time } = useClock('HH:mm:ss');
const year = dayjs().format('YYYY-MM-DD');
const yearTime = ref<string>(year);

</script>

<style scoped lang="scss">
.wrap {
  color: #fff;
  font-size: 16px;
  position: absolute;
  right: 80px;
  top: 58px;
  .time {
    margin-left: 10px;
  }
}
</style>