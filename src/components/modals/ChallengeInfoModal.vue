<template>
  <div id="challenge-info-modal" @click="shouldExit" ref="modal" v-if="visible">
    <div class="modal">
      <h3>🔥 {{ challenge.title }}</h3>
      <p>{{ challenge.description }}</p>

      <!-- Close modal -->
      <div class="close-modal">
        <button @click="close">
          <img src="../../assets/img/close.svg" alt="sluiten" width="21" height="21">
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      visible: false,
      challenge: null,
    };
  },
  methods: {
    show(challenge) {
      this.visible = true;
      this.challenge = challenge;
      document.body.classList.add("modal-open");
    },
    close() {
      this.visible = false;
      document.body.classList.remove("modal-open");
    },
    shouldExit(e) {
      if (e.target === this.$refs.modal) this.close();
    },
  },
}

</script>

<style scoped>

#challenge-info-modal {
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.modal {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 500px;
  border-radius: 0.5rem;
  background: #fff;
  padding: 2rem;
}

.close-modal {
  position: absolute;
  top: 1.75rem;
  right: 2rem;
}

.close-modal button {
  background: none;
  border: none;
  outline: none;
  transform: scale(1.3);
  cursor: pointer;
}

.modal p {
  margin: 1rem 0;
}

h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.25rem;
}

@media screen and (max-width: 560px) {
  .modal {
    width: 80%;
  }
}

</style>