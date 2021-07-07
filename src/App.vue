<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
    <BackToTopArrow />
  </div>
</template>

<script>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import BackToTopArrow from "./components/BackToTopArrow.vue"

export default {
  components: {
    Header,
    Footer,
    BackToTopArrow
  }
}

</script>

<style>

</style>
