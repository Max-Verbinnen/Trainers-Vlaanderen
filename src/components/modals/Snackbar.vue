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
    setTimeout(() => this.$emit("closeSnackbar"), 5000);
  },
}

</script>

<style scoped>

#snackbar {
  position: fixed;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem;
  display: flex;
  background: #fff;
  z-index: 1000;
  box-shadow: 0 5px 45px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  background: var(--light-green);
}

button {
  background: none;
  border: none;
  outline: none;
  transform: scale(1.3);
  cursor: pointer;
  margin-left: 1rem;
}

</style>