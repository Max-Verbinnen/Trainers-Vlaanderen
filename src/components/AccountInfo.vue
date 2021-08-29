<template>
  <div id="account-page">
    <section id="account">
      <h2>Mijn trainingen</h2>
      <template v-if="trainings.length === 0">
        <p id="no-training">
          Bedankt om een account te maken op Trainers Vlaanderen! Je kan zelf trainingen uploaden en dan komen ze hier in je eigen privébibliotheek terecht.
        </p>
        <router-link to="/toevoegen" class="btn">Voeg een training toe</router-link>
      </template>
      <div class="container">
        <div class="card" v-for="training in trainings" :key="training.id">
          <router-link :to="'/training/' + training.id">
          <div class="imgBx">
            <img :src="training.img" alt="training foto" loading="lazy">
          </div>
          <div class="content">
            <h4>{{ training.titel }}</h4>
            <p>{{ training.uitleg | shorten }}</p>
            <div class="bottom-info">
              <p class="trainer">
                <img src="../assets/img/user.svg" alt="trainer" width="21" height="21">
                <span>{{ training.trainer || (training.user && training.user.name) }}</span></p>
              <p class="tags">
                <span v-if="training.categorie">{{training.categorie | destructure}}</span>
                <span>{{ training.spelers }} spelers</span>
                <span>{{ training.onderdeel }}</span>
                <span>{{ training.hoofdthema }}</span>
              </p>
            </div>
          </div>
          </router-link>
        </div>
      </div>
    </section>

    <div style="display: flex; justify-content: center;">
      <!-- Show snackbar when training has been added -->
      <transition name="fade">
        <Snackbar
          ref="snackbar"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase"

import Snackbar from "./modals/Snackbar.vue"

export default {
  data() {
    return {
      trainings: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  components: {
    Snackbar,
  },
  mounted() {
    db.ref('Trainings').orderByChild("user/userID").equalTo(this.user.userID).once("value", snapshot => {
      const data = snapshot.val();
      let trainingsArray = [];

      for (let key in data) {
        data[key].id = key;
        trainingsArray.push(data[key]);
      }
      this.trainings = trainingsArray;
    });

    // Listen whether training has been added
    if (localStorage.getItem("trainingAdded")) {
      this.$refs.snackbar.show("De training is ook succesvol toegevoegd aan de homepage.");
      localStorage.removeItem("trainingAdded");
    }
  },
  filters: {
    shorten(value) {
      let textArray = value.split(" ");
      let n = 8;
      if (textArray.length > n) {
        textArray = textArray.slice(0, n);
      }
      return textArray.join(" ") + "...";
    },
    destructure(value) {
      if (!value) return;
      return value.toString();
    }
  },
}

</script>

<style scoped>

#account h2 {
  margin-bottom: 4rem;
}

#account p#no-training {
  margin-bottom: 2rem;
  max-width: 50rem;
}

.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.container .card {
  position: relative;
  width: 20rem;
  height: 26.25rem;
  background: rgb(246, 253, 243);
  margin: 3.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem 0.5rem 0 0;
}

.container .card a {
  text-decoration: none;
}

.container .card .imgBx {
  position: relative;
  top: -3.75rem;
  left: 1.875rem;
  z-index: 1;
}

.container .card .imgBx img {
  border-radius: 0 0 0.5rem 0.5rem;
  width: 16.25rem;
  max-height: 12.5rem;
  object-fit: cover;
}

.container .card .content {
  margin-top: -2.5rem;
  padding: 0 1.5rem;
  color: #111;
}

.container .card .content h4 {
  font-size: 1.5rem;
  margin: 0.9rem 0;
  text-align: center;
}

.bottom-info {
  position: absolute;
  bottom: 0.5rem;
}

.trainer {
  display: flex;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.trainer img {
  margin-right: 0.25rem;
}

.tags {
  font-size: 0.8rem;
  padding-right: 1.5rem;
}

.tags span {
  display: inline-block;
  background: #D0EAE8;
  color: #66A8A2;
  padding: 0.25rem 0.5rem;
  border-radius: 5rem;
  margin: 0 0.25rem 0.25rem 0;
}

</style>