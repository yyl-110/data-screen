import {createI18n} from 'vue-i18n';

// element-plus 中的语言配置

// 自己的语言配置
import enLocale from './en';
import zhLocale from './cn';

// 语言配置整合
const messages = {
  'en': {
    ...enLocale,
  },
  'zh-cn': {
    ...zhLocale,
  },
};

// 创建 i18n
const i18n = createI18n({
  legacy: false,
  globalInjection: true, // 全局模式，可以直接使用 $t
  locale: 'zh-cn',
  messages: messages,
});

export default i18n;
