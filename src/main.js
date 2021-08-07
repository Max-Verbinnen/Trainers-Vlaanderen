import Vue from 'vue'

// Components & Styles
import App from './App.vue'
import "./assets/css/style.css"

// Libraries & Plugins
import VueRouter from "vue-router"
import "./firebase"

// Activate plugins
Vue.use(VueRouter);

// Router
import routes from "./routes"
const router = new VueRouter({
  routes,
  mode: "history"
});

// Vuex store
import "./store"
import { store } from "./store"

Vue.config.productionTip = false

new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store,
});
