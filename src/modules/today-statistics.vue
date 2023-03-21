<template>
  <div class="rightTop">
    <Title :text="$t('common.title2')" />
    <div class="body">
      <div class="circles">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="center">
        <img src="../assets/left_top_pic1.png" alt="" />
      </div>
      <div class="card">
        <div class="left">
          <div class="num">
            <span>4.2</span>
            <span>MW</span>
          </div>
          <div>总装机功率</div>
        </div>
        <div class="right">
          <div class="num">
            <span>18.37</span>
            <span>MWh</span>
          </div>
          <div>总装机容量</div>
        </div>
        <div class="bottom">
          <div class="num">
            <span>4.2</span>
            <span>个</span>
          </div>
          <div>在线系统数量</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from '@/modules/title.vue';
</script>

<style scoped lang="less">
.rightTop {
  flex: 1 1;
  color: #47f0f2;
  background: url('../assets/bg_sm.png');
  background-size: 98% 95%;
  background-repeat: no-repeat;
  background-position: 50%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 28px;
  .body {
    height: 100%;
    width: 100%;
    position: relative;
    .card {
      height: 100%;
      width: 100%;
      position: relative;
      .num {
        line-height: 24px;
        font-size: 24px;
        font-family: MyriadPro-Regular;
        color: #fff;
      }
      .left {
        top: 25%;
        width: 127px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        background: url('../assets/little-bg.png');
        position: absolute;
        height: 73px;
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 16px;
        color: #0ff;
        font-size: 16px;
      }
      .right {
        width: 139px;
        top: 25%;
        right: 0;
        background: url('../assets/little-bg2.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        position: absolute;
        height: 73px;
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 16px;
        color: #0ff;
        font-size: 16px;
      }
      .bottom {
        width: 155px;
        bottom: 10%;
        left: 50%;
        transform: translateX(-50%);
        background: url('../assets/little-bg3.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        position: absolute;
        height: 73px;
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 16px;
        color: #0ff;
        font-size: 16px;
      }
    }
    .center {
      position: absolute;
      top: 15%;
      left: 50%;
      transform: translate(-50%);
    }
    .circles {
      position: absolute;
      top: 5%;
      left: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
      div {
        position: absolute;
        border: 2px solid #0d4ab9;
        border-radius: 50%;
        transform: rotateX(60deg);
        &:first-child {
          height: 80%;
          width: 80%;
          left: 10%;
          top: 5%;
        }
        &:nth-child(2) {
          height: 60%;
          width: 60%;
          left: 20%;
          top: 15%;
        }
        &:nth-child(3) {
          height: 40%;
          width: 40%;
          left: 30%;
          top: 25%;
        }
      }
    }
  }
}
</style>