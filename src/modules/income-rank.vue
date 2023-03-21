<template>
  <div class="leftBottom">
    <Title :text="$t('common.title3')" />
    <div class="tableArea">
      <div class="tableBody">
        <el-carousel
          trigger="click"
          height="100%"
          direction="vertical"
          style="width: 100%"
          loop
        >
          <el-carousel-item v-for="(item, index) in data" :key="index">
            <div class="list">
              <div v-for="(val, inx) in item" :key="val.key" class="item">
                <div
                  class="color"
                  :class="[
                    index * 12 + inx + 1 === 1 && 'color_1',
                    index * 12 + inx + 1 === 2 && 'color_2',
                    index * 12 + inx + 1 === 3 && 'color_3',
                  ]"
                >
                  {{ index * 12 + inx + 1 }}
                </div>
                <div>{{ val.device_name }}</div>
                <div class="end">{{ val.income }}</div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from '@/modules/title.vue';
 
const props = withDefaults(
  defineProps<{
    data: any;
  }>(),
  {},
);
console.log(props.data);
</script>

<style scoped lang="less">
.leftBottom {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 28px;
  background: url('../assets/left_bottom_bg.png');
  background-size: 98% 97%;
  background-repeat: no-repeat;
  background-position: 50%;
  flex: 2 1;
  color: #47f0f2;
  .tableArea {
    flex: 1 1;
    display: flex;
    flex-direction: column;
    margin-top: 23px;
    .tableBody {
      height: 100%;
      display: flex;
      justify-content: center;
      .list {
        .item {
          text-align: center;
          font-size: 10px;
          display: flex;
          align-items: center;
          flex: 1 1;
          &:nth-child(2n + 1) {
            background: linear-gradient(
              90deg,
              rgba(3, 102, 152, 0),
              rgba(3, 102, 152, 0.36) 50%,
              rgba(3, 102, 152, 0)
            );
          }

          div {
            height: 45px;
            line-height: 45px;
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 400;
            color: #00f1ff;
            &:first-child {
              width: 20px;
              height: 20px;
              margin-right: 23px;
              font-size: 12px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 3px;
              background: rgba(207, 111, 57, 0.1);
            }
            &.end {
              margin-left: auto;
              padding-right: 50px;
            }
          }
          .color {
            color: #00acff;
            border: 1px solid #005593;
          }
          .color_1 {
            border: 1px solid #e18959;
            color: #ffb17f;
          }
          .color_2 {
            border: 1px solid #ff6636;
            color: #e95a2e;
          }
          .color_3 {
            border: 1px solid #da553c;
            color: #da553b;
          }
        }
      }
      /deep/.el-carousel__indicators {
        display: none;
      }
    }
  }
}
</style>