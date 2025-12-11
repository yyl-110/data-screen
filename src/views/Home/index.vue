<template>
  <div class="homeContainer">
    <div class="video-fallback"></div>
    <!-- 添加视频背景 -->
    <video autoplay muted loop playsinline preload="auto" class="video-bg">
      <source src="@/assets/bgvideo.mp4" type="video/mp4" />
      <!-- 可以添加更多格式支持 -->
      <!-- <source src="@/assets/home/background-video.webm" type="video/webm"> -->
    </video>
    <screen-container :width="1920" :height="1080">
      <div class="container">
        <header class="header">
          <img src="../../assets/home/title.png" alt="" />
        </header>
        <main>
          <img src="../../assets/home/LOGO.png" alt="" class="logo" />
          <div v-for="item in list" :key="item.id">
            <img :src="item.url" alt="" @click="goTo(item)" />
          </div>
        </main>
        <footer class="footer" />
      </div>
    </screen-container>
  </div>
</template>

<script setup>
import ScreenContainer from "@/components/screen-container.vue";
import btn1 from "@/assets/home/btn1.png";
import btn3 from "@/assets/home/btn3.png";
import btn2 from "@/assets/home/btn2.png";
import btn4 from "@/assets/home/btn4.png";
import { useRouter } from "vue-router";

const router = useRouter();

const list = [
  { url: btn1, id: 1, path: "/product" },
  { url: btn4, id: 4, path: "/base" },
  { url: btn2, id: 2, path: "/modularization" },
  { url: btn3, id: 3, path: "/system" },
];

const goTo = (item) => {
  router.push({
    path: item.path,
  });
};
</script>

<style lang="scss" scoped>
.homeContainer {
  width: 100%;
  height: 100%;
  // background-image: url("../../assets/home/bg.png");
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
  position: relative;

  .video-fallback {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("../../assets/home/bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: 99;
  }

  .video-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 100;
    /* 确保视频在其他内容后面 */
  }

  @keyframes float {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-20px);
    }

    100% {
      transform: translateY(0);
    }
  }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    main {
      flex: 1;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      position: relative;

      .logo {
        position: absolute;
        width: 240px;
        top: -15px;
        left: 100px;
      }

      >div {
        width: 50%;
        text-align: center;
        // animation: float 2s ease-in-out infinite;
        cursor: pointer;

        &:nth-of-type(1) {
          padding-right: 100px;
        }

        &:nth-of-type(2) {
          padding-left: 200px;
        }

        &:nth-of-type(3) {
          padding-right: 100px;
        }

        &:nth-of-type(4) {
          padding-left: 200px;
        }
      }

      img {
        width: 292px;
      }
    }

    .footer {
      width: 100%;
      height: 70px;
      background-image: url("../../assets/home/titleBg2.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
    }

    .header {
      width: 100%;
      height: 114px;
      text-align: center;
      background-image: url("../../assets/home/titleBg1.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      padding-top: 26px;

      img {
        width: 596px;
      }
    }
  }
}
</style>