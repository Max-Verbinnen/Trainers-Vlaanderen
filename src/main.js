import Vue from 'vue'

// Components & Styles
import App from './App.vue'
import "./assets/css/style.css"

// Libraries & Plugins
import VueRouter from "vue-router"
import VueResource from "vue-resource"
import firebase from "firebase"

// Activate plugins
Vue.use(VueRouter);
Vue.use(VueResource);

// Router
import routes from "./routes"
const router = new VueRouter({
  routes,
  mode: "history"
});

Vue.config.productionTip = false

new Vue({
  el: "#app",
  render: h => h(App),
  router,
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyD6qMKWZTbPTGzAVdVaTZ8gIG9Tl5xb73o",
      authDomain: "trainers-vlaanderen-51280.firebaseapp.com",
      projectId: "trainers-vlaanderen-51280",
      storageBucket: "trainers-vlaanderen-51280.appspot.com",
      messagingSenderId: "45370909626",
      appId: "1:45370909626:web:cb12d14819cd4d28587383",
      measurementId: "G-GX1MLSS2R8"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
});
