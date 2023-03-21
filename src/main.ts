import {createApp} from 'vue';
import App from './App.vue';
import '@/styles/common.less';
import CountTo from 'vue3-count-to';
import ECharts from '@/plugins/echarts-plugin';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import i18n from '@/utils/lang';

const app = createApp(App);
app.use(i18n);
app.use(ElementPlus);
app.component('v-chart', ECharts).use(CountTo).mount('#app');
