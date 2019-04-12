//imports of the most important stuff
import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import Navigation from './Navigation.vue'
import AppFooter from './AppFooter.vue'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//style
import VueMathjax from 'vue-mathjax'
Vue.use(VueMathjax);
Vue.use(BootstrapVue);


//router
Vue.use(VueRouter);

export const bus = new Vue();
const router = new VueRouter({
	routes: Routes,
	/*mode: 'history'*/
});

//import of custom components that are in App.vue
Vue.component('app-navigation', Navigation);
Vue.component('app-footer', AppFooter);

//Vue instance rendering
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
