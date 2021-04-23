// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import store from './store/store'
import qs from 'qs'      //引入qs
import {VueJsonp} from 'vue-jsonp'

Vue.use(VueJsonp)
Vue.prototype.$qs = qs

axios.defaults.withCredentials=true;
Vue.prototype.$axios = axios

Vue.use(ElementUI);
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
