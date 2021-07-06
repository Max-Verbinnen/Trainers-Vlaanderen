<template>
  <div>
    <Header />
    <router-view></router-view>
    <BackToTopArrow />
  </div>
</template>

<script>
import Header from "./components/Header.vue"
import BackToTopArrow from "./components/BackToTopArrow.vue"

export default {
  components: {
    Header,
    BackToTopArrow
  }
}

</script>

<style>

</style>
