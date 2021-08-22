<template>
  <div></div>
</template>

<script>

export default {
  created() {
    // Redirect to homepage
    localStorage.setItem("404", "true");
    this.$router.push("/");
  },
}

</script>