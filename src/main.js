import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import Navigation from './Navigation.vue'
import Content from './Content.vue'
import AppFooter from './AppFooter.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './styles.css'

import VueMathjax from 'vue-mathjax'
Vue.use(VueMathjax)

export const bus = new Vue();


Vue.use(BootstrapVue);
Vue.component('app-navigation', Navigation);
Vue.component('app-content', Content);
Vue.component('app-footer', AppFooter);

new Vue({
  el: '#app',
  render: h => h(App)
})
