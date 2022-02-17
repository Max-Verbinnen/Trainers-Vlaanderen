<template>
  <div id="add-challenge-modal" @click="shouldExit" ref="modal" v-if="visible">
    <div class="modal">
      <h3>Nieuwe challenge toevoegen</h3>

      <form @submit.prevent="handleSubmit" autocomplete="off" ref="form">
        <div class="input-group">
          <label id="info">Titel*</label><br>
          <input id="fill" type="text" v-model="challenge.title" required>
        </div>

        <div class="input-group">
          <label id="info">Beschrijving*</label><br>
          <textarea id="fill" v-model="challenge.description" required></textarea>
        </div>

        <div class="input-group dates">
          <div class="start-date">
            <label id="info">Startdatum*</label><br>
            <input id="fill" type="date" v-model="challenge.startDate" required>
          </div>
          <div class="end-date">
            <label id="info">Einddatum*</label><br>
            <input id="fill" type="date" v-model="challenge.endDate" required>
          </div>
        </div>

        <input
          type="submit"
          value="Voeg toe"
          class="btn"
        >
      </form>

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
import { db } from "../../firebase";
import { currentDate } from "../../utils";

export default {
  data() {
    return {
      visible: false,
      challenge: {
        title: "",
        description: "",
        startDate: "",
        endDate: "",
      },
    };
  },
  methods: {
    show() {
      this.visible = true;
      document.body.classList.add("modal-open");
    },
    close() {
      this.visible = false;
      document.body.classList.remove("modal-open");
    },
    shouldExit(e) {
      if (e.target === this.$refs.modal) this.close();
    },
    async handleSubmit() {
      await db.ref('Challenges').push({
        ...this.challenge,
        userID: this.$store.state.user.userID,
        registrationDate: currentDate(),
      });
      
      // Clear input values & close modal
      Object.keys(this.challenge).forEach(key => this.challenge[key] = "");
      this.close();
    },
  },
}

</script>

<style scoped>

#add-challenge-modal {
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
  height: 560px;
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

input, textarea {
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgb(161, 161, 161);
}

textarea {
  resize: none;
  height: 10rem;
}

input:focus, textarea:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--primary-green);
}

.input-group {
  margin: 1rem 0;
}

#info {
  font-size: 1.3rem;
}

#fill {
  margin-top: 0.5rem;
}

.input-group.dates {
  display: flex;
  justify-content: space-between;
}

input[type="submit"] {
  font-size: 1rem;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  padding: 0.625rem 1.25rem;
  margin-top: 1rem;
  border: none;
  color: #fff;
}

</style>