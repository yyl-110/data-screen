import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router/index";
import App from "./App.vue";
import "@/styles/common.scss";
import "@/styles/global.css";
import CountTo from "vue3-count-to";
import ECharts from "@/plugins/echarts-plugin";
import ElementPlus from "element-plus";
import i18n from "@/utils/lang";
import "element-plus/dist/index.css";

const pinia = createPinia();
const app = createApp(App);

// 按顺序注册插件和组件
app.use(router); // 使用路由
app.use(ElementPlus); // 使用 Element Plus
app.use(CountTo); // 使用 CountTo
app.use(i18n);
app.use(pinia);
app.component("v-chart", ECharts); // 注册 ECharts 组件

// 最后挂载应用
app.mount("#app");
