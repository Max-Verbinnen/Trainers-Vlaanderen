<template>
  <div id="single-training-page">
    <section id="training">
      <div id="print">
        <h2>{{training.titel}}</h2>
        <p class="trainer"><img src="../assets/img/user.svg" alt="trainer"> <span>{{training.trainer}} 
          <span>({{training.diploma}})</span></span>
        </p>
        <div class="uitleg">
          <p>{{training.uitleg}}</p>
          <img :src="training.img" alt="training afbeelding" class="training">
        </div>
      </div>
      <div class="details">
        <p v-if="training.categorie"><span id="subtitle">Categorie</span>: {{training.categorie | destructure}}</p>
        <p><span id="subtitle">Spelers</span>: {{training.spelers}}</p>
        <p v-if="training.niveau"><span id="subtitle">Niveau van de spelers</span>: {{training.niveau}}</p>
        <p><span id="subtitle">Duur van de training</span>: {{training.duur}} minuten</p>
        <p><span id="subtitle">Onderdeel</span>: {{training.onderdeel}}</p>
        <p><span id="subtitle">Hoofdthema</span>: {{training.hoofdthema}}</p>
        <p v-if="training.subthema"><span id="subtitle">Subthema</span>: {{training.subthema}}</p>
        <p v-if="training.variaties"><span id="subtitle">Variaties</span>: {{training.variaties}}</p>
        <p v-if="training.doorschuifsysteem"><span id="subtitle">Doorschuifsysteem</span>: {{training.doorschuifsysteem}}</p>
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
import {printPage} from "../utils"

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
    this.$http.get("https://trainers-vlaanderen-51280-default-rtdb.firebaseio.com/Trainings/" + this.$route.params.id + ".json")
      .then(data => data.json())
      .then(data => {
        this.training = data;
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