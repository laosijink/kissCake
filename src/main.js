import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vueWechatTitle from "vue-wechat-title"
import "lib-flexible/flexible.js"
import coreConfig from "@/core/core.config.js"
Vue.use(vueWechatTitle)
Vue.use(coreConfig)

//ui组件
//底部导航
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
