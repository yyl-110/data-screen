<template>
  <div class="top-header">
    <div class="headerLeft">
      <span>{{ time }}</span>
      <span>{{ yearTime }}</span>
    </div>
    <div class="headerCenter">用户侧储能云平台</div>
    <div class="headerRight">
      <div class="btn-inner" @click="changeLanguage">
        <div class="wrap">
          <span :class="[state.curLanguage !== 'cn' ? 'top' : 'bottom']">
            中
          </span>
          <span :class="[state.curLanguage !== 'en' ? 'top' : 'bottom']">
            En
          </span>
        </div>
      </div>
      <span @click="clickFullscreen">
        <!-- 全屏 -->
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          class=""
          data-icon="fullscreen"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          v-if="!screenfull.isFullscreen"
        >
          <path
            d="M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z"
          ></path>
        </svg>
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          class=""
          data-icon="fullscreen-exit"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          v-else
        >
          <path
            d="M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z"
          ></path>
        </svg>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import screenfull from 'screenfull';
import useClock from '@/compositions/useClock';
import dayjs from 'dayjs';

import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const state = reactive({
  curLanguage: 'cn',
});
const emit = defineEmits(['onclick']);

const changeLanguage = () => {
  state.curLanguage = state.curLanguage === 'cn' ? 'en' : 'cn';
  locale.value = state.curLanguage;
  emit('onclick', state.curLanguage);
};

const { time } = useClock('HH:mm:ss');
const year = dayjs().format('YYYY-MM-DD');
const yearTime = ref<string>(year);
/* 全屏控制 */
const fullscreen = ref<boolean>(false);
const clickFullscreen = () => {
  if (!screenfull.isEnabled) {
    alert('you browser can not work');
    return false;
  }
  screenfull.toggle();
};
</script>

<style lang="less" scoped>
.top-header {
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-image: url('../assets/header_center_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 50%;
  padding: 0 26px;
  .headerCenter {
    flex: 1 1;
    text-align: center;
    margin-top: -5px;
    font-size: 40px;
    font-weight: 700;
    color: #f8ffff;
  }
  .headerRight {
    text-align: right;
    width: 280px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .btn-inner {
      flex-shrink: 0;
      transition: all 0.2s;
      cursor: pointer;
      margin-right: 20px;
      .wrap {
        position: relative;
        width: 1.2em;
        height: 1.2em;
        .top {
          position: absolute;
          font-size: 1.2em;
          line-height: 1;
          border: 1px solid rgba(0, 0, 0, 0.88);
          color: #fff;
          right: -5%;
          bottom: 0;
          z-index: 0;
          -webkit-transform: scale(0.5);
          -moz-transform: scale(0.5);
          -ms-transform: scale(0.5);
          transform: scale(0.5);
          transform-origin: 100% 100%;
        }
        .bottom {
          position: absolute;
          font-size: 1.2em;
          line-height: 1;
          border: 1px solid rgba(0, 0, 0, 0.88);
          color: rgba(0, 0, 0, 0.88);
          left: -5%;
          top: 0;
          z-index: 1;
          background-color: rgba(0, 0, 0, 0.88);
          color: #ffffff;
          -webkit-transform: scale(0.7);
          -moz-transform: scale(0.7);
          -ms-transform: scale(0.7);
          transform: scale(0.7);
          transform-origin: 0 0;
        }
      }
    }
    svg {
      cursor: pointer;
    }
  }
  .headerLeft {
    background-image: url(../assets/time_bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 60px;
    width: 280px;
    background-position: 50%;
    padding: 0 0 0 18px;
    display: flex;
    align-items: center;
    justify-items: center;

    span {
      font-size: 21px;
      line-height: 19px;
      font-weight: 700;
      color: #79f0f6;
      &:first-child {
        font-size: 26px;
        margin-right: 10px;
        font-weight: 400;
        color: #7ffaff;
      }
    }
  }
}
</style>
