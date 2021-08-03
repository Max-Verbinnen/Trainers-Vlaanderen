<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
    <BackToTopArrow />
  </div>
</template>

<script>
// import { auth } from "./firebase"

import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import BackToTopArrow from "./components/BackToTopArrow.vue"

export default {
  components: {
    Header,
    Footer,
    BackToTopArrow
  },
  // beforeCreate() {
  //   auth.onAuthStateChanged(user => {
  //     if (user && this.$router.currentRoute.path === "/account") this.$router.push("/");
  //   });
  // },
}

</script>

<style>

</style>
