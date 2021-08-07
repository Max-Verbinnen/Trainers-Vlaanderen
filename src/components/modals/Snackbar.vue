<template>
  <div id="snackbar">
    <p>{{ text }}</p>

    <!-- Close snackbar -->
    <button @click="$emit('closeSnackbar')"><img src="../../assets/img/close.svg" alt="sluiten"></button>
  </div>
</template>

<script>

export default {
  props: {
    text: {
      type: String,
      required: true,
    }
  },
  created() {
    setTimeout(() => this.$emit("closeSnackbar"), 4000);
  },
}

</script>

<style scoped>

#snackbar {
  position: fixed;
  max-width: 80%;
  top: 5rem;
  padding: 1rem;
  display: flex;
  background: #fff;
  z-index: 1000;
  box-shadow: 0 5px 45px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  background: var(--light-green);
  animation: bounce-in .5s;
}

button {
  background: none;
  border: none;
  outline: none;
  transform: scale(1.3);
  cursor: pointer;
  margin-left: 1rem;
}

img {
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@media screen and (max-width: 1020px) {
  #snackbar {
    top: 7rem;
  }
}

</style>