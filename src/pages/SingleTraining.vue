<template>
  <div id="single-training-page">
    <section id="training">
      <div id="print">
        <h2>{{ training.titel }}</h2>
        <p class="trainer">
          <img src="../assets/img/user.svg" alt="trainer">
          <span>{{ training.trainer || (training.user && training.user.name) }}
          <span>({{ (training.user && training.user.diploma) || training.diploma }})</span></span>
        </p>
        <div class="uitleg">
          <div>
            <p>{{training.uitleg}}</p>
            <h4 v-if="training.doelstellingen">Doelstellingen</h4>
            <p>{{training.doelstellingen}}</p>
          </div>
          <img :src="training.img" alt="training afbeelding" class="training">
        </div>
      </div>
      <div class="details">
        <p v-if="training.categorie"><span id="subtitle">Categorie</span>: {{ training.categorie | destructure }}</p>
        <p v-if="training.spelers"><span id="subtitle">Spelers</span>: {{ training.spelers }}</p>
        <p v-if="training.keepers"><span id="subtitle">Keepers</span>: {{ training.keepers }}</p>
        <p v-if="training.materiaal"><span id="subtitle">Materiaal</span>: {{ training.materiaal }}</p>
        <p v-if="training.niveau"><span id="subtitle">Niveau van de spelers</span>: {{ training.niveau }}</p>
        <p v-if="training.duur"><span id="subtitle">Duur van de training</span>: {{ training.duur }}</p>
        <p v-if="training.intensiteit"><span id="subtitle">Intensiteit</span>: {{ training.intensiteit }}</p>
        <p v-if="training.onderdeel"><span id="subtitle">Onderdeel</span>: {{ training.onderdeel }}</p>
        <p v-if="training.hoofdthema"><span id="subtitle">Hoofdthema</span>: {{ training.hoofdthema }}</p>
        <p v-if="training.subthema"><span id="subtitle">Subthema</span>: {{ training.subthema }}</p>
        <p v-if="training.variaties"><span id="subtitle">Variaties</span>: {{ training.variaties }}</p>
        <p v-if="training.doorschuifsysteem"><span id="subtitle">Doorschuifsysteem</span>: {{ training.doorschuifsysteem }}</p>
      </div>
      
      <div class="print">
        <button @click="printPage">
          <span>Print deze pagina</span>
          <img src="../assets/img/printer.svg" alt="Print deze pagina">
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { db } from "../firebase"
import { printPage } from "../utils"

export default {
  data() {
    return {
      training: {}
    }
  },
  methods: {
    printPage
  },
  created() {
    db.ref(`Trainings/${this.$route.params.id}`).once('value', snapshot => {
      this.training = snapshot.val();
      document.title = "Trainers Vlaanderen | " + this.training.titel;
    });
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  filters: {
    destructure(value) {
      return value.toString();
    }
  }
}

</script>

<style scoped>

#single-training-page {
  min-height: 110vh;
}

#training {
  margin-bottom: 4.5rem;
}

.trainer {
  display: flex;
  font-weight: 500;
  margin: 1rem 0 2rem 0;
}

.trainer img {
  margin-right: 0.25rem;
}

img.training {
  width: 30rem;
}

.uitleg {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rem;
}

.uitleg h4 {
  margin: 1rem 0 0.25rem 0;
}

.uitleg p {
  white-space: pre-line;
  max-width: 30rem;
}

.uitleg img {
  align-self: center;
}

#subtitle {
  font-weight: 700;
}

.details p {
  margin-bottom: 0.5rem;
}

.details {
  margin-bottom: 2rem;
}

@media screen and (max-width: 1200px) {
  .uitleg {
    flex-direction: column;
    margin: 0;
  }
  .uitleg img {
    align-self: flex-start;
    margin: 3rem 0;
  }
}

@media screen and (max-width: 560px) {
  .uitleg img {
    width: 280px;
  }
}

.print button {
  outline: none;
  border: none;
  background: rgb(243, 243, 243);
  padding: 0.6rem 1rem;
  font-size: initial;
  display: flex;
  cursor: pointer;
  border-radius: 0.5rem;
}

.print button img {
  margin-left: 0.5rem;
}

</style>