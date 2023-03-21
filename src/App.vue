<template>
  <screen-container :width="1920" :height="1080">
    <top-header @onclick="changeLang"></top-header>
    <content-wrapper :langStr="lang"></content-wrapper>
  </screen-container>
</template>

<script setup lang="ts">
import ScreenContainer from '@/components/screen-container.vue';
import TopHeader from '@/modules/top-header.vue';
import ContentWrapper from '@/modules/content-wrapper.vue';
const lang = ref<string>('cn');
const changeLang = (e: string) => {
  lang.value = e;
};
</script>

<style lang="less">
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
  background-image: url('./assets/screen_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #fff;
}
</style>
