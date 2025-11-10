<template>
  <div class="moduleStatistics">
    <div class="centerHeader">
      <div class="title">模块总数</div>
      <div>
        <count-to :startVal="0" :endVal="moduleTotal" :duration="1000" :autoplay="true" :separator="','"
          class="count-style" />
      </div>
    </div>
    <div class="main">
      <div class="center">
        <img src="../../../assets/module/centerBg.png" alt="" class="rotating-3d">
        <div class="pointItem" v-for="(item, index) in moduleNumList" :key="index">
          <img src="../../../assets/module/point.png" alt="" class="rotating">
          <div class="rotate"></div>
          <div>{{ item.moduleName }}</div>
          <span>{{ item.moduleNum }}%</span>
        </div>
      </div>
      <div class="bottom">
        <div class="list">
          <div class="row1">
            <div class="item" v-for="(item, index) in computedResNumList.slice(0, 2)" :key="index">
              <span class="name">{{ item.majorName }}</span>
              <div>
                <count-to :startVal="0" :endVal="item.moduleNum" :duration="1000" :autoplay="true" :separator="','"
                  class="count-style" />
              </div>
              <span class="rate">{{ item.rate }}</span>
            </div>
          </div>
          <div class="row2">
            <div class="item" v-for="(item, index) in computedResNumList.slice(2)" :key="index">
              <span class="name">{{ item.majorName }}</span>
              <div>
                <count-to :startVal="0" :endVal="item.moduleNum" :duration="1000" :autoplay="true" :separator="','"
                  class="count-style" />
              </div>
              <span class="rate">{{ item.rate }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const pointList = [
  { label: '标准模块', rate: '34.12%' },
  { label: '预组装模块', rate: '38.12%' },
  { label: '基型模块', rate: '34.12%' },
]
const list = [
  { label: '总体', num: 396, rate: '28%' },
  { label: '辅助系统', num: 396, rate: '28%' },
  { label: '车体', num: 396, rate: '28%' },
  { label: '电传动', num: 396, rate: '28%' },
  { label: '转向架', num: 396, rate: '28%' },
  { label: '制动系统', num: 396, rate: '28%' },
]

const computedResNumList = computed(() => {
  if (!props.resNumList || props.resNumList.length === 0) {
    return [];
  }

  // 计算总数
  const total = props.resNumList.reduce((sum, item) => sum + (item.moduleNum || 0), 0);

  // 返回带计算比率的新数组
  return props.resNumList.map(item => {
    const rate = total > 0 ? ((item.moduleNum / total) * 100).toFixed(0) + '%' : '0%';
    return {
      ...item,
      rate: rate
    };
  });
});

const props = defineProps({
  moduleTotal: {
    type: Number,
    default: 0
  },
  moduleNumList: {
    type: Array,
    default: () => []
  },
  resNumList: {
    type: Array,
    default: () => []
  }
})



</script>

<style lang="scss" scoped>
.moduleStatistics {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;

  .centerHeader {
    width: 429px;
    height: 132px;
    background-image: url('../../assets/module/totalBg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-top: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .count-style {
      font-size: 80px;
      background: linear-gradient(to bottom, #fff, #006FD0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-family: 'MyFont', sans-serif;
      display: inline-block;
      margin-top: -18px;
    }

    .title {
      color: #fff;
      font-size: 30px;
      font-weight: bold;
    }
  }

  .main {
    flex: 1;
    width: 100%;
    height: 0;
    background-image: url('../../../assets/module/bg1.png');
    background-repeat: no-repeat;
    background-size: 790px 295px;
    background-position: center bottom;

    .center {
      height: 290px;
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: -26px;
      position: relative;
      // 添加3D旋转动画
      // .rotating-3d {
      //   width: 435px;
      //   height: 100%;
      //   animation: rotate3d 10s infinite linear;
      //   transform-style: preserve-3d;
      // }

      // @keyframes rotate3d {
      //   0% {
      //     transform: rotateY(0deg) rotateX(10deg);
      //   }
      //   25% {
      //     transform: rotateY(90deg) rotateX(10deg);
      //   }
      //   50% {
      //     transform: rotateY(180deg) rotateX(10deg);
      //   }
      //   75% {
      //     transform: rotateY(270deg) rotateX(10deg);
      //   }
      //   100% {
      //     transform: rotateY(360deg) rotateX(10deg);
      //   }
      // }


      .pointItem {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;

        .rotate {
          width: 35px;
          height: 20px;
          border: 2px #66FFFF dashed;
          border-radius: 50%;
          animation: ripple 2s infinite;

        }

        @keyframes ripple {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }

          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }

          100% {
            transform: translateY(0);
          }
        }

        &:nth-of-type(1) {
          left: 10%;
          top: 10%;
        }

        &:nth-of-type(2) {
          right: 10%;
          top: 10%;
        }

        &:nth-of-type(3) {
          left: 50%;
          bottom: -20%;
          transform: translateX(-50%);
        }

        >img {
          width: 43px;
          height: 43px;
          animation: float 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        div {
          font-size: 20px;
          font-weight: bold;
          color: #fff;
          line-height: 28px;
          margin-top: 6px;
        }

        span {
          color: #FFC300;
          font-size: 20px;
          font-weight: bold;
          line-height: 28px;
        }

      }

      >img {
        width: 435px;
        height: 100%;
      }
    }

    .bottom {
      width: 100%;
      box-shadow: border-box;
      margin-top: -65px;

      .item {
        width: 145px;
        height: 106px;
        background-image: url('../../../assets/module/countBg.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        align-items: center;

        .name {
          font-size: 16px;
          color: #fff;
          line-height: 22px;
        }

        .count-style {
          font-size: 20px;
          font-weight: bold;
          background: linear-gradient(to bottom, #fff, #006FD0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .rate {
          font-size: 18px;
          color: #77FF00;
          font-weight: bold;
        }
      }

      .row1 {
        display: flex;
        justify-content: space-between;
        margin-top: -30px;
      }

      .row2 {
        padding: 0 40px;
        display: flex;
        justify-content: space-around;

        .item {
          &:first-child {
            margin-top: -22px;
          }

          &:last-child {
            margin-top: -22px;
          }
        }
      }
    }
  }
}
</style>