import Vue from 'vue'

// Components & Styles
import App from './App.vue'
import "./assets/css/style.css"

// Libraries & Plugins
import VueRouter from "vue-router"
import VueTippy, { TippyComponent } from "vue-tippy";
import "./firebase"

// Activate plugins
Vue.use(VueRouter);
Vue.use(VueTippy);
Vue.component("tippy", TippyComponent);

// Router
import routes from "./routes"
const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.fullPath === "/" && from.fullPath.includes("/training/") && savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
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
