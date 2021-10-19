import Vue from 'vue'
import App from './App'
import store from './store'
import request from './utils/request'
import './static/iconfont/iconfont.css'

Vue.config.productionTip = false

Vue.use(store)
Vue.prototype.$store = store
Vue.prototype.$request = request

App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})

app.$mount()

// 1、uniapp中使用vuex的store对象必须手动挂载到vue原型上
